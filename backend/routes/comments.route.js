import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { createComment, deleteComment, editCommnent, getAllCommentsOnMyBlogs, getCommentsOfPost, likeComment } from '../controller/comment.controller.js';


const router = express.Router();

router.post("/:id/create",isAuthenticated,createComment);
router.delete("/:id/delete",isAuthenticated,deleteComment);
router.put("/:id/edit",isAuthenticated,editCommnent);
router.get("/:id/comments/all",getCommentsOfPost);
router.get("/:id/like",isAuthenticated,likeComment);
router.get("/my-blogs/comments",isAuthenticated,getAllCommentsOnMyBlogs);

export default router;