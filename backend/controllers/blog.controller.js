import mongoose from "mongoose";
import BlogModel from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken"




export const allBlog = async (req, res) => {
  try {
    const blogs = await BlogModel.find();

     if (!blogs) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    return res.status(200).json({
      success: true,
     blogs
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const singleBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "invalid id",
    });
  }

  try {
    const blogs = await BlogModel.findById(id);
    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};


export const authorBlog = async (req, res) => {
 

   try {
       const { token} = req.cookies
    if(!token){
        return res.status(404).json({message: 'invalid token'})
    }

            // Verify token and get user id
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.id;

    // console.log("User", user._id)
    //     console.log("Author", blogs.author.id)
      

  const authorsBlogs =  await BlogModel.find({ author:userId})
  if (!authorsBlogs || authorsBlogs.length === 0) {
      return res.status(200).json({ message: 'No blogs found for this user' });
    }


    return res.status(200).json({
      success: true,
     blogs: authorsBlogs
    });

  } catch (error) {
    console.log("Author All Blog:", error.message)
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const singleAuthorBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "invalid id",
    });
  }

  const {token} = req.cookies
   if(!token){
        return res.status(404).json({message: 'invalid token'})
    }

  try {
  const decoded = jwt.verify(token, process.env.SECRET )
  const userId = decoded.id

    const blogs = await BlogModel.findById(id);
  if (!blogs) {
      return res.status(401).json({ success: false, message: "Blog not found" });
    }

          const authorSingleBlog = await BlogModel.find({author: userId})

    return res.status(200).json({
      success: true,
      blog: authorSingleBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};


export const createBlog = async (req, res) => {
  const { title, subtitle, image, author } = req.body;

  if (!title || !subtitle || !image) {
    return res.status(400).json({
      message: "Please fill in all field",
    });
  }

  try {
    const imageResponse = await cloudinary.uploader.upload(image, {
      folder: "seamfix",
    });

    // const decoded = req.user;

    const blog = await BlogModel.create({
      title,
      subtitle,
      image: imageResponse.secure_url,
      author: req.user._id || req.user.firstName || req.user.lastName,
    });

 
    const populatedBlog = await BlogModel.findById(blog._id).populate("author", 'firstName lastName email')

    return res.status(200).json({
      success: true,
      message: "Blog created successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const updatedBlogs = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "invalid id",
    });
  }

  try {
    if (!updatedBlogs || Object.keys(updatedBlogs).length === 0) {
      return res.status(400).json({
        message: "No data provided to update",
      });
    }
    const blogExists = await BlogModel.findById(id);
    if (!blogExists) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const blog = await BlogModel.findByIdAndUpdate(id, updatedBlogs, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "invalid id",
    });
  }

  try {
    const blogExists = await BlogModel.findById(id);
    const user = req.user
    // console.log("User", user)
    //     console.log("Blog", blogExists)
    if (!blogExists) {
      return res.status(404).json({ message: "Blog not found" });
    }
      if (!user) {
      return res.status(404).json({ message: "Blog not found" });
    }

if (user._id.toString() !== blogExists.author.toString()) {
    return res.status(401).json({ message: "Unautorized,blogs doesnt belong to user"})
}
    
    const blog = await BlogModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      blog,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
