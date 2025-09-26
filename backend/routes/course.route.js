import express from 'express';
import { createBlog, deleteBlog, dislikeBlog, getMyTotalBlogLikes, getOwnBlogs, likeBlog, updateBlog } from '../controller/blog.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';

const  router = express.Router();

router.post("/",createBlog)
router.put("/:blogId",isAuthenticated,singleUpload,updateBlog)
router.get('/get-own-blog',isAuthenticated,getOwnBlogs)
router.delete("/delete/:id",isAuthenticated,deleteBlog)
router.get('/:id/like',isAuthenticated,likeBlog)
router.get('/:id/dislike',isAuthenticated,dislikeBlog)
router.get('/my-blogs/likes',isAuthenticated,getMyTotalBlogLikes)

export default router;