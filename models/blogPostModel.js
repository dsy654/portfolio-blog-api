// models/blogPostModel.js
const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // 这是要求里的，会自动生成时间戳
  }
);

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;