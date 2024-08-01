const mongoose=require("mongoose");
require("dotenv").config();

exports.connectDB=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>(console.log("DB connected successfully")))
    .catch((err)=>{
        console.log("DB connection Issue");
        console.log(err);
        process.exit(1);
    })
}