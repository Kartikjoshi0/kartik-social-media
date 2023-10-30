const express=require('express');
const dotenv=require('dotenv');
const dbconnect=require('./dbconnect')
const authRouter=require('./routes/authRouter')
const postRouter=require('./routes/postRouter')
const userRouter=require("./routes/userRouter")
const cloudinary =require("cloudinary").v2
dotenv.config("C:\Users\dell\OneDrive\Desktop\MERN\server\.env");


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});
const morgon=require('morgan');
const app=express();
const cookieParser=require('cookie-parser');
const cors=require("cors");


app.use(express.json({limit:'10mb'}));
app.use(morgon('common'));
app.use(cookieParser())
let origin = 'http://localhost:3000';
app.use(cors({
    credentials:true,
    origin
}))

app.use('/auth',authRouter);
app.use('/posts',postRouter);
app.use('/user',userRouter);
app.get("/",(req,res)=>{
    res.status(200).send("ok from server");
});


const PORT = process.env.PORT || 4001;
dbconnect();
app.listen(PORT,()=>{
    console.log(`listning on :${PORT}`);
});


