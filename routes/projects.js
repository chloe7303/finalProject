import express from 'express'
import { getProject, addProject, getImage, deleteProject } from '../controllers/projects.js';

const router = express.Router()

// 查詢計畫
router.get('/', getProject)
// 1. '/' 列出全部計畫
// 2. /?id=xxx 找出指定計畫
// 3. /?user=xxx 找出指定user的計畫
// 4. /?id=xxx&user=xxx

// 新增計畫
router.post('/add', addProject)
// 查詢圖片
router.get('/image/:file', getImage)
// 刪除計畫
router.delete('/:id', deleteProject)

export default router