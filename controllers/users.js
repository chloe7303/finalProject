import md5 from 'md5'
import users from '../models/users.js'
import projects from '../models/projects.js'
import mongoose from 'mongoose'
import e from 'express'

export const register = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  try {
    if (req.body.account.length < 4) {
      res.status(400).send({ success: false, message: '帳號必須 4 個字以上' })
    } else if (req.body.password.length < 6 ) {
      res.status(400).send({ success: false, message: '密碼必須 6 個字以上' })
    } else {
      await users.create({
        account: req.body.account,
        password: md5(req.body.password)
      })
      res.status(201).send({ success: true, message: '' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoError' && error.code === 11000) {
      res.status(409).send({ success: false, message: '帳號已被使用' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
    console.log(error)
  }
}

export const login = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  try {
    const result = await users.findOne({
      account: req.body.account,
      password: md5(req.body.password)
    }, '-password')
    if (result === null) {
      res.status(404).send({ success: false, message: '帳號或密碼錯誤' })
    } else {
      // 將使用者資料記錄到 session
      req.session.user = result
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
    console.log(error)
  }
}

export const logout = async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤，無法登出' })
    } else {
      res.clearCookie()
      res.status(200).send({ success: true, message: '' })
    }
  })
}

export const heartbeat = async (req, res) => {
  let isLogin = false
  if (req.session.user) {
    isLogin = true
  }
  res.status(200).send(isLogin)
}

// 取得所有使用者
export const getAllUsers = async (req, res) => {
  try {
    const result = await users.find({}, '-password').populate('funds.project')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 刪除使用者
export const delUser = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '請先登入' })
    return
  }

  try {
    let result = await users.findById(req.params.user)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await users.findByIdAndDelete(req.params.user)
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 新增使用者贊助紀錄
export const fund = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '請先登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    let result = await users.findById(req.params.user)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到使用者' })
    } else if (req.params.user !== req.session.user._id) {
      // console.log(typeof(id))
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await users.findByIdAndUpdate(req.params.user,
        {
          // 新增到使用者的 funds 陣列
          $push: {
            funds: {
              project: req.params.id,
              name: req.body.name,
              phone: req.body.phone,
              email: req.body.email,
              fundAmount: req.body.fundAmount
            }
          }
        }
      , {new: true})
      // 更新已募資金額
      await projects.findByIdAndUpdate(req.params.id,
        {
          $inc: {
            raisedAmount: req.body.fundAmount
          }
        }
      , {new: true})

      // 如果募資成功
      // if (raisedAmount === targetAmount) {
      //   // code
      // }
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
    console.log(error)
  }
}

// 取得使用者贊助紀錄
export const getUserFunds = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '請先登入' })
    return
  }

  try {
    const result = await users.findById(req.params.user).populate('funds.project')
    const funds = result.funds
    res.status(200).send({ success: true, message: '', funds })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
    // console.log(error)
  }
}

// 使用者新增收藏清單
export const addWishlist = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '請先登入' })
    return
  }

  try {
    let result = await users.findById(req.params.user)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到使用者' })
    } else if (req.params.user !== req.session.user._id) {
      // console.log(typeof(id))
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await users.findByIdAndUpdate(req.params.user,
        {
          // 新增到使用者的 funds 陣列
          $push: {
            wishlists: {
              project: req.params.id
            }
          }
        }
      , {new: true})
      const wishlists = result.wishlists
      res.status(200).send({ success: true, message: '', wishlists })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
    console.log(error)
  }
}

// 取得使用者收藏清單
export const getWishlist = async (req, res) => {
  // if (req.session.user === undefined) {
  //   res.status(401).send({ success: false, message: '請先登入' })
  //   return
  // }
  
  try {
    const result = await users.findById(req.params.user).populate('wishlists.project')
    const wishlists = result.wishlists
    res.status(200).send({ success: true, message: '', wishlists })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
    console.log(error)
  }
}

// 刪除使用者收藏清單
export const delWishlist = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '請先登入' })
    return
  }

  try {
    let result = await users.findById(req.params.user)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到使用者' })
    } else if (req.params.user !== req.session.user._id) {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await users.findByIdAndUpdate(req.params.user,
        {
          // 刪除 wishlists 陣列元素
          $pull: {
            wishlists: {
              project: req.params.id
            }
          }
        }
      , {new: true})
      const wishlists = result.wishlists
      res.status(200).send({ success: true, message: '', wishlists })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
    console.log(error)
  }
}

// 取得使用者留言紀錄
export const getUserMsg = async (req, res) => {
  // if (req.session.user === undefined) {
  //   res.status(401).send({ success: false, message: '請先登入' })
  //   return
  // }

  try {
    const result = await projects.aggregate([
      { $unwind: '$msgBoard'},
      { $match: { 'msgBoard.user': mongoose.Types.ObjectId(req.params.user) }},
      { $project : { title: 1, msgBoard: 1} }
    ])
    // result = await result.find({}, 'title msgBoard')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
    console.log(error)
  }
}

// 刪除使用者留言紀錄
export const delUserMsg = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '請先登入' })
    return
  }

  try {
    let result = await projects.find({ 'msgBoard._id': req.params.msgId })
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到使用者' })
    } else if (req.params.user !== req.session.user._id) {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await projects.findOneAndUpdate({ 'msgBoard._id': req.params.msgId },
        {
          $pull: {
            msgBoard: {
              _id: req.params.msgId
            }
          }
        }
        , {new: true})
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
    // console.log(error)
  }
}
