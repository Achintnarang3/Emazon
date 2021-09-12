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

     }).catch((error)=>{
        res.status(400).send("Email Already Taken")
     })
}

exports.signin = (req, res) => {
    
  

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

        if(user.authenticate(password))
        {
            return res.status(400).json({ error: "Enter Correct Password" })
        }
         
        // Create token
        const token=jwt.sign({_id:user._id},process.env.SECRETKEY)

        // Put token in cookie
        res.cookie("token",token,{expire:new Date()+9999})

        
        res.status(200).send({
            user,token
        })





    })


}

exports.isSignedIN=expressJwt({
    secret:process.env.SECRETKEY,
    userProperty:"auth"
})

exports.isAuthenticated=(req,res,next)=>{
    
     

    let checker=req.profile&&req.auth&&req.profile._id==req.auth._id;

    if(!checker)
    {
        return res.status(403).json({
            error:"Access Denied as you are not authenticated"
        })
    }

    next()

}

exports.isAdmin=(req,res,next)=>{
  if(req.profile.user==0)
  {
      return res.status.json({
          message:"Not admin"
      })

     
  }
  next()
}

