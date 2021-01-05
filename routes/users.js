import express from 'express'
import { register, login, logout, heartbeat } from '../controllers/users.js'

const router = express.Router()

// 註冊
router.post('/register', register)
// 登入
router.post('/login', login)
// 登出
router.delete('/logout', logout)
// 判斷是否登入
router.get('/heartbeat', heartbeat)

export default router
