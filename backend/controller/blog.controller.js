import { json } from "express";
import { Blog } from "../models/blog.models.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import path from "path";
import Comment from "../models/comments.model.js";

export const createBlog = async (req,res) =>{
    try{
        const{title,category} = req.body;

        if(!title||!category){
            return res.status(400).json({
                message:"Blog title and category is required"
            })
        }

        const blog = await Blog.create({
            title,
            category,
            author:req.id
        })

        return res.status(201).json({
            success:true,
            blog,
            message:"Blog create successfully"
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId
        const { title, subtitle, description, category } = req.body;
        const file = req.file;

        let blog = await Blog.findById(blogId).populate("author");
        if(!blog){
            return res.status(404).json({
                message:"Blog not found!"
            })
        }
        let thumbnail;
        if (file) {
            const fileUri = getDataUri(file)
            thumbnail = await cloudinary.uploader.upload(fileUri)
        }

        const updateData = {title, subtitle, description, category,author: req.id, thumbnail: thumbnail?.secure_url};
        blog = await Blog.findByIdAndUpdate(blogId, updateData, {new:true});

        res.status(200).json({ success: true, message: "Blog updated successfully", blog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating blog", error: error.message });
    }
};

export const getOwnBlogs = async (req, res) => {
    try {
        const userId = req.id;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const blogs = await Blog.find({ author: userId }).populate({
            path: 'author',
            select: 'firstName lastName photoUrl'
        }).populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'userId',
                select: 'firstName lastName photoUrl'
            }
        });;

        if (!blogs) {
            return res.status(404).json({ message: "No blogs found.", blogs: [], success: false });
        }

        return res.status(200).json({ blogs, success: true });
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error: error.message });
    }
};