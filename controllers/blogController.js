// 文件路径: controllers/blogController.js

const BlogPost = require('../models/blogPostModel');
const Comment = require('../models/commentModel');

// --- Blog Post Controllers ---

// @desc    创建一篇新博客文章
// @route   POST /api/blog
// @access  Private
const createBlogPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const post = await BlogPost.create({
    title,
    content,
    author: req.user.id, // 关联作者
  });

  res.status(201).json(post);
};

// @desc    获取所有博客文章
// @route   GET /api/blog
// @access  Public
const getAllBlogPosts = async (req, res) => {
  const posts = await BlogPost.find({})
    .populate('author', 'username') // **关键**: 关联查询 author 字段，并且只返回 username
    .sort({ createdAt: -1 });
  res.status(200).json(posts);
};

// @desc    获取单篇博客文章
// @route   GET /api/blog/:id
// @access  Public
const getBlogPostById = async (req, res) => {
  const post = await BlogPost.findById(req.params.id)
    .populate('author', 'username'); // 同样，获取作者名

  if (post) {
    // 获取这篇文章的所有评论
    const comments = await Comment.find({ post: req.params.id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    
    // 将文章和评论组合在一起返回
    res.status(200).json({ post, comments });
  } else {
    res.status(404).json({ message: 'Blog post not found' });
  }
};

// @desc    更新一篇博客文章
// @route   PUT /api/blog/:id
// @access  Private & Authorized
const updateBlogPost = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  // **授权逻辑**: 检查当前用户是否是文章作者
  if (post.author.toString() !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedPost);
};

// @desc    删除一篇博客文章
// @route   DELETE /api/blog/:id
// @access  Private & Authorized
const deleteBlogPost = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  // **授权逻辑**: 检查当前用户是否是文章作者
  if (post.author.toString() !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  await post.deleteOne();
  // 可选：同时删除该文章下的所有评论
  await Comment.deleteMany({ post: req.params.id }); 

  res.status(200).json({ message: 'Blog post removed' });
};


// --- Comment Controllers ---

// @desc    为一篇文章创建新评论
// @route   POST /api/blog/:postId/comments
// @access  Private
const createComment = async (req, res) => {
    const { body } = req.body;
    const { postId } = req.params;

    if(!body){
        return res.status(400).json({ message: 'Comment body cannot be empty' });
    }

    const postExists = await BlogPost.findById(postId);
    if (!postExists) {
        return res.status(404).json({ message: 'Blog post not found' });
    }

    const comment = await Comment.create({
        body,
        author: req.user.id,
        post: postId
    });

    res.status(201).json(comment);
}

// @desc    获取一篇文章的所有评论
// @route   GET /api/blog/:postId/comments
// @access  Public
const getCommentsForPost = async (req, res) => {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
        .populate('author', 'username')
        .sort({ createdAt: -1 });

    res.status(200).json(comments);
}


module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  createComment,
  getCommentsForPost,
};
