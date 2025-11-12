// models/userModel.js
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
  }
);
// models/userModel.js

// ... (userSchema 的定义代码) ...

// 在保存之前对密码进行哈希处理
userSchema.pre('save', async function (next) {
  // 如果密码字段没有被修改，则跳过
  if (!this.isModified('password')) {
    next();
  }

  // 生成盐（salt），增加密码破解难度，10是强度因子
  const salt = await bcrypt.genSalt(10);
  // 将密码哈希化
  this.password = await bcrypt.hash(this.password, salt);
});



const User = mongoose.model('User', userSchema);
module.exports = User;