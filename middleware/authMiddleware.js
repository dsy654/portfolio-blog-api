// 文件路径: middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const protect = async (req, res, next) => {
  let token;

  // 1. 从请求头中获取JWT
  // 请求头格式: "Authorization: Bearer <TOKEN>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 提取 Token (去掉 "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // 2. 验证 Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. 根据 Token 中的 id 查找用户，并将其附加到请求对象上
      // 我们不希望返回密码，所以用 .select('-password') 把它排除
      req.user = await User.findById(decoded.id).select('-password');

      // 4. 调用下一个中间件或路由处理器
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };