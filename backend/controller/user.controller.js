import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async(req,res) => {
    try{
        const {firstName,lastName,email,password} = req.body;

        if(!firstName||!lastName||!email||!password){
            return res.status(400).json({
                success:false,
                message:"All filed are required"
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({
                success:false,
                message:"Invalid email"
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                success:false,
                message:"Password must be atleast 6 charcter"
            })
        }

        const existingByEmail = await User.findOne({email:email});

        if(existingByEmail){
            return res.status(400).json({
                success:false,
                message:'Email already exists'
            })
        }

        const hashPasword = await bcrypt.hash(password,10,);

        await User.create({
            firstName,
            lastName,
            email,
            password:hashPasword
        })

        return res.status(201).json({
            success:true,
            message:"Account Created Successfully"
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}

export const login = async (req,res) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:true,
                message:"All fileds are required"
            })
        }

        let user = await User.findOne({email:email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Email not exists"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }

        const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY, { expiresIn: '1d' })
        return res.status(200).cookie("token", token, { maxAge: 5 * 60 * 60 * 1000, httpsOnly: true, sameSite: "strict" }).json({
            success:true,
            message:`Welcome back ${user.firstName}`,
            user,
            token
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}

export const logout = async (req,res) =>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            success:true,
            message:"Logout Successfull"
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        })
    }
}