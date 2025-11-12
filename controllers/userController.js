// 文件路径: controllers/userController.js

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 辅助函数: 用于生成 JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token 有效期设置为30天
  });
};

// ===================================================================
// @desc    注册一个新用户 (Register a new user)
// @route   POST /api/users/register
// @access  Public (公开访问)
// ===================================================================
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // 1. 验证输入数据是否完整
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  // 2. 检查用户是否已经存在
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // 3. 创建用户 (密码哈希在 userModel.js 的 pre-save 钩子中自动完成)
  const user = await User.create({
    username,
    email,
    password,
  });

  // 4. 如果用户创建成功，返回用户信息和 Token
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// ===================================================================
// @desc    认证用户并获取 Token (Authenticate user & get token)
// @route   POST /api/users/login
// @access  Public (公开访问)
// ===================================================================
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. 通过邮箱在数据库中查找用户
  const user = await User.findOne({ email });

  // 2. 检查用户是否存在，并使用 bcrypt.compare 验证密码是否匹配
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    // 如果用户不存在或密码错误，返回错误信息
    res.status(400).json({ message: 'Invalid credentials' });
  }
};

// ===================================================================
// @desc    获取当前登录用户的信息 (Get current user data)
// @route   GET /api/users/me
// @access  Private (私有，需要 Token 验证)
// ===================================================================
const getMe = async (req, res) => {
  // authMiddleware 已经验证了 Token 并将用户信息附加到了 req.user
  // 所以我们这里直接返回 req.user 即可
  res.status(200).json(req.user);
};

// 导出所有控制器函数
module.exports = {
  registerUser,
  loginUser,
  getMe,
};