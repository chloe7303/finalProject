import express from 'express'
import { register, login, logout, heartbeat, getAllUsers, delUser, fund, getUserFunds, addWishlist, getWishlist, delWishlist, getUserMsg, delUserMsg } from '../controllers/users.js'

const router = express.Router()

// 註冊
router.post('/register', register)
// 登入
router.post('/login', login)
// 登出
router.delete('/logout', logout)
// 判斷是否登入
router.get('/heartbeat', heartbeat)
// 取得所有使用者
router.get('/', getAllUsers)
// 刪除使用者
router.delete('/del/:user', delUser)

// 使用者新增贊助紀錄
router.patch('/:user/:id', fund)
// 取得使用者贊助紀錄
router.get('/:user', getUserFunds)

// 使用者新增收藏清單
router.patch('/wishlists/:user/:id', addWishlist)
// 取得使用者收藏清單
router.get('/wishlists/:user', getWishlist)
// 刪除使用者收藏清單
router.patch('/delwishlists/:user/:id', delWishlist)

// 取得使用者留言紀錄
router.get('/msgboard/:user', getUserMsg)
// 刪除使用者留言紀錄
router.patch('/msgboard/:user/:msgId', delUserMsg)

export default router
