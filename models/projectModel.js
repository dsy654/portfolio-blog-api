// models/projectModel.js
const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    user: { // 关联到用户
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      optional: true,
    },
    repoUrl: {
      type: String,
      optional: true,
    },
    liveUrl: {
      type: String,
      optional: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;