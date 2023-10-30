const router=require('express').Router();
const authController=require('../controllers/authController');



router.post('/signup',authController.signupController);
router.post("/logout",authController.logoutController);


router.post("/login",authController.loginController);
router.get("/refresh",authController.refreshTokenControler);

module.exports=router;

