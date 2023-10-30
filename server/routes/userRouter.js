const requireUser=require('../middleware/requireUser');
const userController=require('../controllers/userController');

const router=require("express").Router();

router.post('/follow',requireUser,userController.followOrUnfollowUser)
router.get('/getFeedData',requireUser,userController.getPostOfFollowing)
router.get('/getMyPosts',requireUser,userController.getMyPosts);
router.get('/getUserPosts',requireUser,userController.getUserPosts);
router.delete('/',requireUser,userController.deleteMyProfile);
router.get('/getMyInfo',requireUser,userController.getMyInfo);
router.get('/getUserProfile',requireUser,userController.getUserProfile);


router.put('/',requireUser,userController.updateUserProfile);

module.exports=router;