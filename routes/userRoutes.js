// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController'); // <--- 引入 getMe
const { protect } = require('../middleware/authMiddleware'); // <--- 引入我们的“守卫”

// 公开路由 (Public)
router.post('/register', registerUser);
router.post('/login', loginUser);

// 私有/受保护路由 (Private)
// 当请求这个路由时，会先经过 protect 中间件的检查，通过后才会执行 getMe
router.get('/me', protect, getMe);

module.exports = router;