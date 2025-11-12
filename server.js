// 文件路径: server.js (最终修复版)

const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// 监听所有网络接口，确保 Render 可以访问到
app.listen(PORT, '0.0.0.0', () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});