import mongoose from "mongoose";

export const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("MongoDB Connected Successfully!")
    }catch(error){
        console.log("MongoDb Connection Error")
    }
}