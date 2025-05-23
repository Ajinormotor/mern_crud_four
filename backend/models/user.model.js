import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    firstName : { required: true, type:String},
    lastName: { required: true, type:String},
    email: { required: true, type:String, unique: true},
    age: { required: true, type: Number}
},{timestamps: true})

const User = mongoose.model("User", userSchema)


export default User