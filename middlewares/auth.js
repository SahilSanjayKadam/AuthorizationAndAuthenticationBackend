const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.authentication=(req,res,next)=>{
  try{
    console.log("cookies",req.cookies.token);
    console.log("body",req.body.token);
    console.log("header",req.header("Authorization"));
    const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
    if(!token){
        res.status(401).json({
            success:false,
            message:"Token is Missing"
        })
    }

    //token verification
    try{
     const decode=jwt.verify(token,process.env.JWT_SECRETE_KEY);
     console.log(decode)
     req.userDetails=decode;
    }catch(error){
        res.status(401).json({
            success:false,
            message:"Token is not Correct"
        })
    }
    next();
  }catch(error){
    return res.status(401).json({
        success:false,
        message:"Something went wrong while doing Authentication"
    })
  }
}


exports.isStudent=(req,res,next)=>{
    try{
      if(req.userDetails.role !=="Student"){
            return res.status(401).json({
                success:false,
                message:"Only Students are allowed Here"
            })
      }
      next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not varified"
        })
    }
}


exports.isAdmin=(req,res,next)=>{
    try{
      if(req.userDetails.role !=="Admin"){
            return res.status(401).json({
                success:false,
                message:"Only Admins are allowed Here"
            })
      }
      next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not varified"
        })
    }
}