const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {error}=require('../utils/responseWrapper')
const {success}=require('../utils/responseWrapper')

const signupController = async (req,res)=>{
    try {
        const {name, email, password}=req.body;

        if(!email||!password||!name){
            // return res.status(400).send("All fields are required");
            return res.send(error(400,'All fields are required'));
        }

       const oldUser=await User.findOne({email});
       if(oldUser){
        // res.status(409).send("user exist");
        return res.send(error(409,'user exist'));
       }
       const hashPassword=await bcrypt.hash(password,10);

       const user=await User.create({
        name,
        email,
        password:hashPassword
       });
    //    return res.status(201).json({
    //     user
    //    })
        return res.send(success(201,'user created successfully'));



    } catch (e) {
        console.log("here is error in signup ",e);
        return res.send(error(500,e.message));
    }
}
const loginController = async (req,res)=>{
    try {
        const { email, password}=req.body;

        if(!email||!password){
            // return res.status(400).send("All fields are required");
            return res.send(error(400,'All fields are required'));
        }

       const user=await User.findOne({email}).select('+password');
       if(!user){
        // res.status(409).send("user do not exist");
        return res.send(error(409,'user do not exist'));
       }
       const matched=await bcrypt.compare(password,user.password);
       if(!matched){
        // return res.status(403).send("invalid password");
        return res.send(error(403,'invalid password'));
       }
       const accessToken=generateAccessToken({
        _id:user._id,
        
       });
       const refreshToken=refreshAccessToken({
        _id:user._id,
        
       });
       res.cookie("jwt",refreshToken,{
        httpOnly:true,
        secure:true
       })

       return res.send(success(200,{accessToken}));
        
    } catch (e) {
        console.log("here is error in login ",e);
        return res.send(error(500,e.message));
    }
}
const refreshTokenControler=async (req,res)=>{
    const cookies=req.cookies;
    if(!cookies.jwt){
        // res.status(401).send("refresh token is cookie is required");
        return res.send(error(401,'refresh token is cookie is required'));
    }
    const refreshToken=cookies.jwt;
    console.log('refresssh',refreshToken) 
    
    try {
        const decoded=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_PRIVATE_KEY);
        const _id=decoded._id;
        const accessToken=generateAccessToken({_id});

        res.send(success(201,{accessToken}));
        

    } 
    
    catch (e) {
        console.log("here is error in refresh ",e);
        // res.status(401).send("Invalid refresh Token");
        return res.send(error(401,'Invalid refresh Token'));
    }
}


const generateAccessToken=(data)=>{
    try {
        const token=jwt.sign(data,process.env.ACCESS_TOKEN_PRIVATE_KEY,{
            expiresIn:'1d'
        });
    console.log("this is my ",token);
    return token;
    } catch (e) {
        console.log("here is error in get accessToken ",e);
    }
    
}
const refreshAccessToken=(data)=>{
    try {
        const token=jwt.sign(data,process.env.REFRESH_TOKEN_PRIVATE_KEY,{
            expiresIn:'3y'
        });
    console.log(token);
    return token;
    } catch (error) {
        console.log("here is error in get refresh token ",e);
    }
    
}

const logoutController=async (req,res)=>{
    try {
        res.clearCookie('jwt',{
            httpOnly:true,
            secure:true,
        })
        return res.send(success(200,"user logged out"));
    } catch (e) {
        res.send(error(500,"e.message"));
    }
}

module.exports={
    signupController,
    loginController,
    refreshTokenControler,
    logoutController
};