const jwt = require('jsonwebtoken') 
const middleware=(req,res,next)=>{
    const token=req.query.token
    const decode=jwt.verify(token,"iamperformingjwtauthenticationonourfaautomationsystem")
    if(decode){
        next()
    }
    else{
        res.send("Error").status(400)
    }
}

module.exports=middleware