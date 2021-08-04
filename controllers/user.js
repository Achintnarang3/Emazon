const User=require("../models/user.js")
const { check,validationResult} = require('express-validator');


exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err||!user)
        {
            return res.status(400).json({
                message:"No user found"
            })
        }

        req.profile=user
        next()
    })
}

exports.getUser=(req,res)=>{

    req.profile.salt=undefined
    req.profile.encry_password=undefined

    res.json(req.profile)
}

exports.getAllUsers=(req,res)=>{
    
    User.find({},(err,user)=>{
        if(err)
        {
            return res.status(400).json(err)
        }

        return res.status(400).json(user)

        
    })
}

exports.updateUser=(req,res)=>{
    
    const errors=validationResult(req)

    if(!errors.isEmpty())
    {
        return res.json({
            error:errors.array()[0].msg
        })
    }

    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:true},
        (err,user)=>{
            if(err)
            {
                return res.status(400).send("User not find")
            }

            user.salt=undefined
            user.encry_password=undefined
        
            res.json(user)


        }
    )
}