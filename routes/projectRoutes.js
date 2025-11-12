// 文件路径: routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// 公开路由
router.get('/', getProjects);
router.get('/:id', getProjectById);

// 私有/受保护路由
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

// 也可以链式书写，更简洁
// router.route('/').get(getProjects).post(protect, createProject);
// router.route('/:id').get(getProjectById).put(protect, updateProject).delete(protect, deleteProject);


module.exports = router;