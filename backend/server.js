import express from "express";
import userRoutes from "./routes/user.routes.js"
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js";
import logger from "./middleware/logger.js";
import errHandler from "./utils/errHandler.js";
import cors from 'cors'
import path from "path"


const __dirname = path.resolve()

const app = express()
dotenv.config()
const PORT = process.env.PORT || 3000


console.log('Mongodb url:', process.env.MONGO_URL)
app.use(express.json())

app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? "https://mern-crud-four.onrender.com"
    : "http://localhost:5173",
  credentials: true,
}));

app.use(logger);

app.use('/api/users', userRoutes)

// app.use('/', (req,res,next) => {
//     const error = new Error("Route not Found")
//     res.status = 404
//     next(error)
// })



if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, 'frontend', 'dist')))

app.get("*", (req,res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
})


}

app.use(errHandler)



app.listen(PORT, () => {
    connectDB(),
 console.log(`Server is listening at localhost:${PORT}`)
})