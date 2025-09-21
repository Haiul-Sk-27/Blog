import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db/db.js';
import userRoute from './routes/user.route.js';
import cors from 'cors'

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 3002 ;

app.use('/api/v1/user',userRoute)

app.get('/', (req, res) => {
    res.send('Hello, server is running ✅');
});

app.listen(PORT, () => {
    connectDb()
    console.log(`🚀 Server running on port ${PORT}`);
});