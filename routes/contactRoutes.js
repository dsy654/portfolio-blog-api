// 文件路径: routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const { saveMessage } = require('../controllers/contactController');

// 这是一个公开路由，任何人都可以访问
router.post('/', saveMessage);

module.exports = router;