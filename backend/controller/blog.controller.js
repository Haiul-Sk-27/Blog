import { json } from "express";
import { Blog } from "../models/blog.models.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

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

export const updateBlog = async (req,res) =>{
    try{
        const blogId = req.params.blogId;
        const { title, subtitle, description, category } = req.body;

        let blog = await Blog.findById(blogId);

        if(!blog){
            return res.status(404).json({
                success:false,
                message:"Blog Not Found"
            })
        }

        let thumbnail;

        if(file){
            const fileUri = getDataUri(file)
            thumbnail = await cloudinary.uploader.upload(fileUri)
        }

        const updateData = {title, subtitle, description, category,author: req.id, thumbnail: thumbnail?.secure_url};
        blog = await Blog.findByIdAndUpdate(blogId,updateData,{new:true})

        res.status(200).json({ success: true, message: "Blog updated successfully", blog });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error Updating"
        })
    }
}