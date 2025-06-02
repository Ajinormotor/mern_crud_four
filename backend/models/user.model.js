import mongoose, { Schema } from "mongoose";
import bcryptjs from  'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String,  required: [true, "Please provide first name"], },
    lastName: { type: String, required: [true, "Please provide a last name"], trim: true},
    email: { type: String,  required: [true, "Please provide a valid email"], unique: true },
    age: { type: Number, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
      default: 'user',
    },
    password: {type:String, required:true, minLength:[ 4, 'Minimum length should be 4 character long']},
    image : {type:String, }
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});


userSchema.methods.comparePassword = async function(userPassword) {
  return await bcryptjs.compare(userPassword,this.password)
}

const User = mongoose.model("User", userSchema);

export default User;
