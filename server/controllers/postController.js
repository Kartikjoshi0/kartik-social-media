
const Post = require("../models/Post");
const User = require("../models/User");
const { mapPostOutput } = require("../utils/Utils");

const { success,error } = require("../utils/responseWrapper");
const cloudinary = require('cloudinary').v2;



const createPostController=async (req,res)=>{
    try {
        const {caption,postImg}=req.body;
        if(!caption || !postImg) {
            return res.send(error(400, 'Caption and postImg are required'))
        }
        const cloudImg = await cloudinary.uploader.upload(postImg, {
            folder: 'postImg'
        })
    const owner=req._id;

    const user= await User.findById(req._id);

    const post = await Post.create({
        owner,
        caption,
        image:{
            publicId:cloudImg.publicId,
            url:cloudImg.url
        }
    })

    user.posts.push(post._id);
    await user.save();
    console.log("user",user);
    console.log("post",post);
    return res.json(success(201,{post}));


    } catch (e) {
        console.log(e);
        return res.send(error(500,e.message))
    }
    
}

const likeAndUnlikePost =async (req,res)=>{

    try {
        const {postId}=req.body;
    const currUserId=req._id;

    const post=await Post.findById(postId).populate("owner");
    if(!post){
        return res.send(error(404,"Post not found"));
    }

    if(post.likes.includes(currUserId)){
        const index=post.likes.indexOf(currUserId);
        post.likes.splice(index,1);
    }else{
        post.likes.push(currUserId);

    }
    await post.save();
    return res.send(success(200,{post:mapPostOutput(post,req._id)})); 
        
    } catch (e) {
        return res.send(error(500,e.message));
        
    }
    
}

const updatePostController=async(req,res)=>{
    try {
        const {postId,caption}=req.body;
    const currUserId=req._id;

    const post=await Post.findById(postId);
    if(!post){
        return res.send(error(404,"post not found"));
    }

    if(post.owner.toString() !== currUserId){
        return res.send(error(403,"only owner can update the post"));
    }
    if(caption){
        post.caption=caption;
    }
    await post.save();
    res.send(success(200,{post}));


    } catch (e) {
        console.log(e);
        return res.send(error(500,e.message))
    }
}

const deletePost=async(req,res)=>{
    try {
        const { postId }=req.body;
    const currUserId=req._id;

    const posts=await Post.findById(postId);
    const currUser=await User.findById(currUserId);

    
    if(!posts){
        return res.send(error(404,"post not found"));
    }

    if(posts.owner.toString() !== currUserId){
        return res.send(error(403,"only owner can delete the post"));
    }

    const index=currUser.post.indexOf(postId);
    currUser.post.splice(index,1);
    await currUser.save();
    await posts.remove();

    return res.send(success(200,"post deleted succesfully"));
    } catch (e) {
        console.log(e);
        return res.send(error(500,e.message))
    }
}

module.exports={
    
    createPostController,
    likeAndUnlikePost,
    updatePostController,
    deletePost
}