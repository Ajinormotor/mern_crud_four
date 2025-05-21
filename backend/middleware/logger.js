export default function logger (req,res,next){
    console.log('from logger middleware request method:' , req.method)
    next()
}