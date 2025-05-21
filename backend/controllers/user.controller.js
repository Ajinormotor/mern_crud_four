import mongoose from "mongoose"
import User from "../models/user.model.js"

export const getAllUser = async (req,res) => {
  

    try {
     const users =  await User.find({}) 
     return res.status(200).json({
        success: true,
        data: users
     })
        
    } catch (error) {
        console.log('Error message:', error.message)
    return res.status(500).json({ message: error.message}) 
    }

}

export const getSingleUser = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'Invalid id'})
    }

    try {

      

          const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

            return res.status(200).json({
                success: true,
        data: user
     })
        
    } catch (error) {

              console.log('Error message:', error.message)
    return res.status(500).json({ message: error.message}) 
        
    }
}

export const createUser = async (req, res) => {
  const { firstName, lastName, email, age } = req.body;

  if (!firstName || !lastName || !email || !age) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const user = await User.create({ firstName, lastName, email, age });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: error.message || "Could not create user" });
  }
};


export const updateUser = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(401).json({success: false, message: 'Invalid id'})
    }
    try {
        const user = await User.findByIdAndUpdate(id,req.body, {new: true})

         if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

                return res.status(200).json({
                success: true,
       message : 'Updated Successfully',
       data: user
     })

        
    } catch (error) {
           console.log('Error message:', error.message)
    return res.status(500).json({ message: error.message}) 
        
    }
}

export const deleteUser = async(req,res) => {

      const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(401).json({success: false, message: 'Invalid id'})
    }

    try {
        const user = await User.findByIdAndDelete(id)

                  return res.status(200).json({
                success: true,
         message: 'Deleted Successfully',
      //  data: user
     })
        
  
        
    } catch (error) {
           console.log('Error message:', error.message)
    return res.status(500).json({ message: error.message}) 
        
    }
}