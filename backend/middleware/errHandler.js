export default function errHandler (err,req,res,next) {

    if(err.status){
     res.status(err.status).json({general_message: err.message})
    }
    res.status(500).json({message:'Internal Sevrer error'})
    next()

}