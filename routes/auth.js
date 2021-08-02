var express=require('express')
var router=express.Router()
const { check } = require('express-validator');
const {signout,signup,signin}= require('../controllers/auth.js')
 

router.get("/signout",signout)


router.post("/signup",[
    check('password').isLength({min:5}),
    check('name','Name should be atleast 5 ch long').isLength({min:5}),
    check('email','Enter Correct Email').isEmail()
],
signup)

router.post("/signin",[
    check('password','Enter the password').isLength({min:1}),
    check('email','Enter Correct Email').isEmail()
],
signin)


module.exports=router
 
