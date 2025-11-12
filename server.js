// 文件路径: server.js

const express = require('express');
const helmet = require('helmet'); // 1. 引入 helmet
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// 加载 .env 文件中的环境变量
dotenv.config();

// 连接到 MongoDB 数据库
connectDB();

const app = express();

// ======================================================
// 中间件 (Middleware)
// ======================================================

// 2. 使用 helmet 中间件来设置各种安全的 HTTP 头
// 应该尽早使用，确保所有响应都受到保护
app.use(helmet());

// 允许 Express 解析传入的 JSON 请求体
app.use(express.json());


// ======================================================
// 根路由 (用于快速测试服务器是否在线)
// ======================================================
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});


// ======================================================
// API 路由挂载点
// ======================================================
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));


// ======================================================
// 中央错误处理中间件 (必须放在所有路由挂载之后)
// ======================================================
app.use(errorHandler);


// ======================================================
// 启动服务器
//