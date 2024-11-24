import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoute from './routes/user.route.js'
import messageRoute from './routes/message.route.js'
import cookieParser from 'cookie-parser';
import { app,server } from './SocketIO/server.js';
app.use(express.json())
app.use(cookieParser());
app.use(cors(
     {origin: "https://chatapplication-frontend-muc4.onrender.com",
     credentials: true}
));
dotenv.config();
const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI;
try {
    mongoose.connect(URI)
    console.log('mongodb connected');
} catch (error) {
    console.log(error);
    
}

app.use("/api/user",userRoute)
app.use("/api/message",messageRoute)

server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})
