// 文件路径: middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  // 如果响应中已经设置了状态码，就用它，否则默认为 500 (服务器内部错误)
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    // 只在开发环境中显示错误的堆栈信息，生产环境中隐藏
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};