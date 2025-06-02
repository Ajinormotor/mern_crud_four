import User from "../models/user.model.js"
import UserModel from "../models/user.model.js"
import { generateToken } from "../utils/generateToken.js"


export const register = async(req,res) => {
    try {

        const {firstName, lastName, email, age, password} = req.body
        if(!firstName || !lastName || !email || !age ||!password) {
            return res.status(401).json({message: "Please fill all field"})
        }

   if(password.length < 4){  return res.status(400).json({  message: "Password should be at least 5 chaacters long i"}) }

// const exisitingUser = await UserModel.find({ $or: [ {email}]})

// if(exisitingUser)
//     return res.status(400).json({message: "User exist already"})

     const profileImage = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${firstName}`

        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            age,
            password,
            image: profileImage

        })
        const token = await generateToken(user._id, res)

        return res.status(200).json({
            success:true,
            message:"Registered successful",
            user,
            token
        })

        
    } catch (error) {
              console.log(error.message)
           return res.status(500).json({
            success: false,
           message: 'Internal Server error',
        })
        
        
    }
}



export const login = async(req,res) => {

    const {email, password} = req.body
    try {
  const user = await UserModel.findOne({email})
  const isMatch = await user.comparePassword(password);

  if(!user || !isMatch){
    return res.status(400).json({message: 'invalid credentials'})
  }

 const token = await generateToken(user._id, res)

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    user,
    token

  })
        
    } catch (error) {
              console.log(error.message)
           return res.status(500).json({
            success: false,
           message: 'Internal Server error',
        })
        
        
    }
}


export const logout = async(req,res) => {
    try {
      res.clearCookie("token")
        return res.status(200).json({
            success: true,
            message: "Logged out successful"
        })
        
    } catch (error) {
              console.log(error.message)
           return res.status(500).json({
            success: false,
           message: 'Internal Server error',
        })
        
        
    }
}