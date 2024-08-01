const express=require("express");
const app=express();
const cookieparser=require("cookie-parser")

require('dotenv').config();
const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use(cookieparser())

const dbConnect=require("./config/Database");
dbConnect.connectDB();

const user=require("./routes/user");
app.use("/api/v1",user);

app.listen(PORT,()=>{
    console.log(`App is listening at PORT ${PORT}`)
})