const express = require('express');
const router = express.Router();
const {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  createComment,
  getCommentsForPost,
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

// === 博客文章路由 ===
router.route('/')
  .post(protect, createBlogPost)
  .get(getAllBlogPosts);

router.route('/:id')
  .get(getBlogPostById)
  .put(protect, updateBlogPost)
  .delete(protect, deleteBlogPost);

// === 评论路由 ===
router.route('/:postId/comments')
    .post(protect, createComment)
    .get(getCommentsForPost);


module.exports = router;
