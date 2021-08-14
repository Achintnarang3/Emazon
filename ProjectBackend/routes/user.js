const express=require("express")
const router=express.Router()
const { body } = require('express-validator');


const {getUserById,getUser,getAllUsers,updateUser,getProduct}=require("../controllers/user")
const {signout,signup,signin,isSignedIN,isAuthenticated}=require("../controllers/auth")

router.get("/getAllUsers",getAllUsers)



router.param('userId',getUserById)

router.get("/:userId",isSignedIN,isAuthenticated,getUser)

router.put("/:userId",isSignedIN,isAuthenticated,[

    body('name','Name should be atleast 5 ch long').isLength({min:5}),
  

],updateUser)

//router.get("/products/:userId",isSignedIN,isAuthenticated,getProduct)









module.exports=router