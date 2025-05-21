import mongoose from "mongoose"

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        // console.log(`MongoDB conected to: ${conn.connection.host}`)
              console.log(`MongoDB connected`)
        
    } catch (error) {
        console.error("Mongodb error:",error)
        process.exit(1)
    }
}