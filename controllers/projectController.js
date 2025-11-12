// 文件路径: controllers/projectController.js

const Project = require('../models/projectModel');

// @desc    获取所有项目 (Get all projects)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: -1 }); // 按创建时间倒序排序
  res.status(200).json(projects);
};

// @desc    获取单个项目 (Get a single project)
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
};

// @desc    创建一个新项目 (Create a new project)
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  const { title, description, imageUrl, repoUrl, liveUrl } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const project = new Project({
    title,
    description,
    imageUrl,
    repoUrl,
    liveUrl,
    user: req.user.id, // 关联到当前登录的用户
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
};

// @desc    更新一个项目 (Update a project)
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  const { title, description, imageUrl, repoUrl, liveUrl } = req.body;

  const project = await Project.findById(req.params.id);

  if (project) {
    // 检查项目是否属于当前登录的用户 (虽然项目要求是admin-only，但这个检查是好习惯)
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.imageUrl = imageUrl || project.imageUrl;
    project.repoUrl = repoUrl || project.repoUrl;
    project.liveUrl = liveUrl || project.liveUrl;

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
};

// @desc    删除一个项目 (Delete a project)
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    await project.deleteOne(); // 使用新版 Mongoose 的 deleteOne() 方法
    res.status(200).json({ message: 'Project removed' });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
};


module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};