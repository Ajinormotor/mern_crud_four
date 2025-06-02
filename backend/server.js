import express from "express";
import cookieParser from "cookie-parser";

import dotenv from 'dotenv'
import { connectDB } from "./config/db.js";
import logger from "./middleware/logger.js";
import errHandler from "./middleware/errHandler.js";
// import cors from 'cors'
import path from "path"

import userRoutes from "./routes/user.routes.js"
import blogRoutes from "./routes/blog.routes.js"
import authRoutes from "./routes/auth.routes.js"

import {v2 as cloudinary} from 'cloudinary'


const __dirname = path.resolve()

const app = express()
dotenv.config()
   cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
               api_key: process.env.CLOUD_KEY,
            api_secret: process.env.CLOUD_SEC,
        })
    
const PORT = process.env.PORT || 3000

// console.log('Mongodb url:', process.env.MONGO_URL)
app.use(express.json())
app.use(cookieParser())

// app.use(cors({
//   origin: process.env.NODE_ENV === "production"
//     ? "https://mern-crud-four.onrender.com"
//     : "http://localhost:5173",
//   credentials: true,
// }));

app.use(logger);


app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/blogs', blogRoutes)





if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));


    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}


app.use('/', (req,res,next) => {
    const error = new Error("Route not Found")
res.status(404)
    next(error)
})


app.use(errHandler)




app.listen(PORT, () => {
    connectDB(),
 console.log(`Server is listening at localhost:${PORT}`)
})