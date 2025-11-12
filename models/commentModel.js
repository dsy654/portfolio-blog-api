// models/commentModel.js
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    post: { // 评论关联到哪篇文章
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'BlogPost',
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;