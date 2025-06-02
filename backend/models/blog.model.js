import mongoose from "mongoose";

const blogSchema =  new mongoose.Schema({
  title: { type: String, required: true, minLength: 3 },
subtitle: { type: String, required: true, minLength: 3 },
    image: { type:String},
    author: {type:mongoose.Schema.Types.ObjectId, ref:"User", required: true}

},{timestamps: true })



const Blog = mongoose.model("Blog", blogSchema)

export default Blog