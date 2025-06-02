import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js"
import User from "../models/user.model.js"

export const protect = async(req,res,next) => {
    const authHeaders = req.headers["authorization"]

    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        return res.status(401).json({
            message: "No token provided"
        })
    }
    
    try {
        const token = authHeaders.split(" ")[1]
        const decoded = jwt.verify(token,process.env.SECRET)
        // console.log('Decoded user', decoded)
        const user = await UserModel.findById(decoded.id).select("-password")
        // console.log('User', user)

         if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user

        next()
        
    } catch (error) {
        return res.status(500).json({ message:"Invalid token"})
        
    }

}


export const authorizeRole = async(req,res,next) =>{

     const {token} = req.cookies
    
     try {
       const decoded = jwt.verify(token,process.env.SECRET)
        // console.log('Decoded user', decoded)
        const user = await UserModel.findById(decoded.id).select("-password")
        // console.log("User", user)
        if(user.role !== 'admin'){
            return res.status(403).json({
                message:'Unauthorized'
            })
        }

        next()
        
     } catch (error) {
        return res.status(403).JSON({
            message: error.message
        })
        
     }
    
}