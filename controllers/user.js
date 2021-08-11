const User=require("../models/user.js")
const Order=require("../models/order.js")
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

exports.getProdcut=(req,res)=>{
  
    Order.find({user:req.profile._id}).populate("user","_id name").exec((err,order)=>{
        
        if(err)
        {
            res.status(400).json({
                message:"Error in Finding"
            })
        }

        res.status(200).json(order)


    })


}

exports.pushOrderInPurchaseList=(req,res,next)=>{
    let purchases=[]
    req.body.order.products.forEach(product => {
        purchases.push(
            {
                _id:product._id,
                name:product.name,
                description:product.description,
                category:product.category,
                quantity:product.quantity,
                amount:product.amount,
                transaction_id:req.body.order.transaction_id
            }
        );
        
    });
}



