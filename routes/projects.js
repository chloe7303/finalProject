import express from 'express'
import { getAllProject, getProject, addProject } from '../controllers/projects.js';

const router = express.Router()

// 主頁時抓取資料
router.get('/', getAllProject)
// 各計劃頁面
router.get('/:projectId', getProject)
// 新增計畫
router.post('/add', addProject)

export default router