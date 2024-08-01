const express=require("express");
const router=express.Router();

const {signUp,login}=require("../Controllers/Auth");
const {authentication,isStudent,isAdmin}=require("../middlewares/auth")
router.post("/login",login);
router.post("/signUp",signUp);

//protected routes
router.get("/student",authentication,isStudent,(req,res)=>{
       res.json({
         success:true,
         message:"Welcome,All Students"
       })
})
router.get("/admin",authentication,isAdmin,(req,res)=>{
     res.json({
      success:true,
      message:"Welcome,All Admins"
    })
})
router.get("/test",authentication,(req,res)=>{
    res.json({
      success:true,
      message:"Welcome All"
    })
})

module.exports=router;