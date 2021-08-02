const User=require("../models/user.js")
 const jwt=require("jsonwebtoken")
const expressJwt=require("express-jwt")
const { check,validationResult} = require('express-validator');


exports.signout=(req,res)=>{
   
res.send("user signout")

}

exports.signup=(req,res)=>{

    const errors=validationResult(req)

    if(!errors.isEmpty())
    {
        return res.json({
            error:errors.array()[0].msg
        })
    }

     const user=new User(req.body)
     user.save().then((user)=>{

        res.status(200).json({
            name:user.name,
            email:user.email,
            id:user._id
        })

     }).catch((err)=>{
        res.status(400).send(err)
     })
}

exports.signin=(req,res)=>{

    const {email,password}=req.body
  //  console.log(email)
    const errors=validationResult(req)

    if(!errors.isEmpty())
    {
        return res.json({
            error:errors.array()[0].msg
        })
    }

    User.findOne({email},(err,user)=>{
       
        
        if(err)
        {
            return res.status(400).send("Enter Correct Email")
        }

        //console.log(user)

        if(!user.authenticate(password))
        {
            return res.status(400).send("Enter Correct Password")
        }
         
        // Create token
        const token=jwt.sign({_id:user._id},process.env.SECRETKEY)

        // Put token in cookie
        res.cookie("token",token,{expire:new Date()+9999})

        // Send response to frontend
        const{_id,name,email,role}=user

        res.status(200).json({
            _id,name,email,role
        })





    })


}