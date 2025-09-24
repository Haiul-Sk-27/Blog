import express from 'express';
import { createBlog, getOwnBlogs, updateBlog } from '../controller/blog.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';

const  router = express.Router();

router.post("/",createBlog)
router.put("/:blogId",isAuthenticated,singleUpload,updateBlog)
router.get('/get-own-blog',isAuthenticated,getOwnBlogs)

export default router;