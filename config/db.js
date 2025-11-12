// 文件路径: config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 连接数据库，新版本的 Mongoose 不再需要额外的选项对象
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // 在控制台打印成功的连接信息，方便调试
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // 如果连接失败，打印错误信息并退出程序
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;