import { Blog } from "../models/blog.models.js";
import Comment from "../models/comments.model.js";

export const createComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentKrneWaleKiId = req.id;
        const { content } = req.body;

        const blog = await Blog.findById(postId);

        if (!content) return res.status(400).json({ message: "Text is required", success: false });

        const comment = await Comment.create({
            content,
            userId: commentKrneWaleKiId,
            postId: postId
        })

        await comment.populate({
            path: "userId",
            select: "firstName lastName photoUrl"
        })

        blog.comments.push(comment._id);
        await blog.save();

        return res.status(201).json({
            message: "Comment Add",
            comment,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCommentsOfPost = async (req, res) => {
    try {
        const blogId = req.params.id;
        const comments = await Comment.find({ postId: blogId }).populate({
            path: "userId",
            select: "firstName lastName photoUrl"
        }).sort({ createdAt: -1 });

        if (!comments) {
            return res.status(404).json({
                message: "No Comments found",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            comments
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const authorId = req.id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "comments not found"
            })
        }

        if (comment.userId.toString() !== authorId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to delete the comment"
            })
        }

        const blogId = comment.postId;

        //deleteComment

        await Comment.findByIdAndDelete(commentId);

        //removes commnets  id from the blogs
        await Blog.findByIdAndUpdate(blogId, {
            $pull: { comments: commentId }
        })

        res.status(200).json({ success: true, message: "Comment delete success full" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting comment", error: error.message });
    }
}

export const editComment = async (req, res) => {
  try {
    const userId = req.id
    const { content } = req.body
    const commentId = req.params.id

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    // check if the user owns the comment
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this comment' });
    }

    comment.content = content;
    comment.editedAt = new Date();

    await comment.save();

    res.status(200).json({ success: true, message: 'Comment updated successfully', comment });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Comment is not edited", error: error.message })

  }
}

export const likeComment = async (req, res) => {
    try {

        const userId = req.id;
        const commentId = req.params.id;

        const comment = await Comment.findById(commentId).populate("userId");

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            })
        }

        const alreadyLiked = comment.likes.includes(userId);

        if (alreadyLiked) {
            comment.likes = comment.likes.filter(id => id !== userId);
            comment.numberOfLikes;
        } else {
            comment.likes.push(userId);
            comment.numberOfLikes += 1;
        }

        await comment.save();
        res.status(200).json({
            success: true,
            message: alreadyLiked ? "Comment unliked" : "Comment liked",
            updatedComment: comment,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while liking the comment",
            error: error.message,
        })
    }
}

export const getAllCommentsOnMyBlogs = async (req, res) => {
  try {
    const userId = req.id; // assuming you're using auth middleware

    // Step 1: Find all blog posts created by the logged-in user
    const myBlogs = await Blog.find({ author: userId }).select("_id");

    const blogIds = myBlogs.map(blog => blog._id);

    if (blogIds.length === 0) {
      return res.status(200).json({
        success: true,
        totalComments: 0,
        comments: [],
        message: "No blogs found for this user.",
      });
    }

    // Step 2: Find all comments on these blogs
    const comments = await Comment.find({ postId: { $in: blogIds } })
      .populate("userId", "firstName lastName email")
      .populate("postId", "title");

    res.status(200).json({
      success: true,
      totalComments: comments.length,
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments on user's blogs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get comments.",
    });
  }
};