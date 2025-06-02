import jwt from "jsonwebtoken"

export const generateToken = async(userId,res) => {



    const token = jwt.sign({id: userId}, process.env.SECRET, {expiresIn: "7d"})


    res.cookie("token", token, {
        httpOnly: true,
        secure : process.env.NODE_ENV==="production",
       sameSite: "strict",
        maxAge:  7 *24 * 60 * 60 * 1000
    })

    return token
    
}