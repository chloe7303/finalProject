import multer, { MulterError } from 'multer'
import FTPStorage from 'multer-ftp'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import projects from '../models/projects.js'

dotenv.config()

// 上傳圖片設定
// 本機開發時檔案存電腦 雲端環境時檔案存 FTP
let storage
if (process.env.DEV === 'true') {
  storage = multer.diskStorage({
    destination (req, file, callback) {
      callback(null, 'images/')
    },
    filename (req, file, callback) {
      callback(null, Date.now() + path.extname(file.originalname))
    }
  })
} else {
  storage = new FTPStorage({
    ftp: {
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false
    },
    // 上傳的路徑含檔名 /123.jpg
    destination (req, file, options, callback) {
      callback(null, '/' + Date.now() + path.extname(file.originalname))
    }
  })
}

// 取得計畫
export const getProject = async (req, res) => {
  try {
    const search = {}
    if (req.query.user) {
      Object.assign(search, {user: req.query.user})
      // Object.assign(target, ...sources)
    }
    if (req.query.id) {
      Object.assign(search, {_id: req.query.id})
    }
    // console.log(search);
    const result = await projects.find(search)
    const count = result.length
    res.status(200).send({ success: true, message: '', count, result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 上傳圖片設定
const upload = multer({
  storage,
  fileFilter (req, file, callback) {
    if (!file.mimetype.includes('image')) {
      callback(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      callback(null, true)
    }
  },
  limits: {
    // 1MB = 1024 * 1024 B
    fieldSize: 1024 * 1024
  }
})

// 新增計畫
export const addProject = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '請先登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  upload.single('image')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案上限為 1MB'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '檔案格式不符'
      } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        message = '欄位不符'
      } else {
        message = '上傳錯誤'
      }

      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        let file = ''
        if (process.env.DEV === 'true') {
          file = req.file.filename
        } else {
          file = path.basename(req.file.path)
        }
        const result = await projects.create({
          user: req.session.user._id,
          title: req.body.title,
          subtitle: req.body.subtitle,
          proposer: req.body.proposer,
          description: req.body.description,
          targetAmount: req.body.targetAmount,
          image: file,
          begin: req.body.begin,
          finish: req.body.finish
        })
        res.status(201).send({ success: true, message: '', result })
      } catch (error) {
        if (error.name === 'ValidationError') {
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400).send({ success: false, message })
        } else {
          res.status(500).send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
}

// 取得圖片
export const getImage = async (req, res) => {
  // 開發環境回傳本機圖片
  if (process.env.DEV === 'true') {
    const path = process.cwd() + '/images/' + req.params.file
    const exists = fs.existsSync(path)

    if (exists) {
      res.status(200).sendFile(path)
    } else {
      res.status(404).send({ success: false, message: '找不到圖片' })
    }
  } else {
    axios({
      method: 'GET',
      url: 'http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.file,
      responseType: 'stream'
    }).then(res => {
      res.data.pipe(res)
    }).catch(error => {
      res.status(error.response.status).send({ success: false, message: '取得圖片失敗' })
    })
  }
}

// 刪除計畫
export const deleteProject = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '請先登入'})
    return
  }

  try {
    let result = await projects.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (req.session.user.account !== 'admin' && result.user.toString() !== req.session.user._id) {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await projects.findByIdAndDelete(req.params.id)
      res.status(200).send({ success: true, message: '', result })

      // 刪除本機圖片檔 若要刪除FTP的圖片要另外寫
      if (process.env.DEV === 'true') {
        fs.unlink('images/' + result.image, () => {})
        // fs.unlink(path, callback)
      }
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
    console.log(error)
  }
}

// 修改計畫
export const editProject = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    let result = await projects.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (req.session.user.account !== 'admin' && result.user.toString() !== req.session.user._id) {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await projects.findByIdAndUpdate(req.params.id, req.body, { new: true })
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

// 新增留言
export const addMsg = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '請先登入'})
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    let result = await projects.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到使用者' })
    } else if (req.params.user !== req.session.user._id ) {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await projects.findByIdAndUpdate(req.params.id,
        {
          $push: {
            msgBoard: {
              user: req.params.user,
              message: req.body.message,
              date: new Date()
            }
          }
        }, 
        {new: true}
      ).populate('msgBoard.user', 'account')
      const msgBoard = result.msgBoard
      res.status(200).send({ success: true, message: '', msgBoard })
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

// 取得留言
export const getMsg = async (req, res) => {
  try {
    const result = await projects.findById(req.params.id).populate('msgBoard.user', 'account')
    const msgBoard = result.msgBoard
    res.status(200).send({ success: true, message: '', msgBoard })
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

// 募資成功
export const success = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }

  try {
    let result = await projects.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await projects.findByIdAndUpdate(req.params.id, {sucess: true}, { new: true })
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