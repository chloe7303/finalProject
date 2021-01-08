import md5 from 'md5'
import users from '../models/users.js'

export const register = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  try {
    if (req.body.account.length < 4) {
      res.status(400).send({ success: false, message: '帳號必須 4 個字以上' })
    } else if (req.body.password.length > 6 ) {
      res.status(400).send({ success: false, message: '密碼必須 6 個字以上' })
    } else {
      await users.create({
        account: req.body.account,
        password: md5(req.body.password)
      })
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '帳號已被使用' })
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