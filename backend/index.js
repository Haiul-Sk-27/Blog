import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db/db.js';
import userRoute from './routes/user.route.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import blogRoute from './routes/course.route.js'
import commentRoute from './routes/comments.route.js'

dotenv.config();

const app = express();

// default middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://blog-murex-eight-41.vercel.app"
    ],
    credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT;

app.use('/api/v1/user', userRoute)
app.use('/api/v1/blog', blogRoute)
app.use("/api/v1/comment", commentRoute)

app.get('/', (req, res) => {
    res.send('Hello, server is running ✅');
});

app.listen(PORT, () => {
    connectDb()
    console.log(`🚀 Server running on port ${PORT}`);
});