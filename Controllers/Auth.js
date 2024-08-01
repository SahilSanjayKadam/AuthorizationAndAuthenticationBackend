const bcrypt=require("bcrypt");
const User=require("../Models/User");
const jwt=require("jsonwebtoken")
require('dotenv').config();

exports.signUp = async (req,res)=>{
     try{
       const {name,email,password,role}=req.body;
       const existingUser=await User.findOne({email});
       //check if the user exist or not
       if(existingUser){
         return res.status(500).json({
            success:false,
            message:"User Exist With Same Email"
         })
       }

       //secure the password
       let hashPassword;
       try{
          hashPassword=await bcrypt.hash(password,10);
       }catch(e){
            return res.status(500).json({
                success:false,
                message:"Error with Hashing"
            })
       }

       const user=await User.create({
          name,email,password:hashPassword,role
       })

       return res.status(200).json({
           success:true,
           message:"User Created Successfully"
       })

     }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while creating the user,try again later"
        })
     }
}

exports.login=async (req,res)=>{
   try{
     const {email, password}=req.body;
     if(!email || !password){
       return res.status(400).json({
         success:false,
         message:"Please fill all the details"
       })
     }
     
     let alreadyRegistered= await User.findOne({email});
     
     if(!alreadyRegistered){
      return res.status(401).json({
         success:false,
         message:"Please complete the signup first"
       })
     }

     const payload={
         email:alreadyRegistered.email,
         id:alreadyRegistered._id,
         role:alreadyRegistered.role
     }

     if(await bcrypt.compare(password,alreadyRegistered.password)){
           let token=jwt.sign(payload, process.env.JWT_SECRETE_KEY, {
            expiresIn:"2h"
           })
           alreadyRegistered=alreadyRegistered.toObject();
          alreadyRegistered.token=token;
         alreadyRegistered.password=undefined;
             console.log(alreadyRegistered)
           const options={
              expires: new Date(Date.now()+2*24*60*60*1000),
              httpOnly:true
           }
           res.cookie("token",token,options).status(200).json({
              success:true,
              token,
              alreadyRegistered,
              message:"User Logged in successfully"
           })

        //    return res.status(200).json({
        //     success:true,
        //     token,
        //     alreadyRegistered,
        //     message:"User Logged in successfully"
        //  })
     }else{
         return res.status(403).json({
           success:false,
           message:"Incorrect Password"
         })
     }



   }catch(error){
        console.log(error);
        return res.status(500).json({
          success:false,
          message:"Unable to Login"
        })
   }
}