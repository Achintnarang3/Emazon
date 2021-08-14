const Order=require("../models/order")

exports.getOrderById=(req,res,next,id)=>{

    Order.findById(id).exec((err,order)=>{
        if(err||!order)
        {
            return res.status(400).json({
                message:"No order found"
            })
        }

        req.order=order
        next()
    })
}

exports.createOrder=(req,res)=>{
    req.body.order.user=req.profile
    const order=new Order(req.body.order)
    order.save().exec((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                message:"Unable to create order"
            })
        }

    })
    res.json(order)
}

exports.getAllOrder=(req,res)=>{

    Order.find().populate("user","_id name").exec((err,order)=>{
        
        if(err)
        {
            return res.status(400).json({
                message:"Unable to get all  order"
            })
        }

        res.json(order)


    })
}

exports.getOrderStatus=(req,res)=>{

    res.json(Order.schema.path("status").enumValues);

}

exports.updateOrderStatus=(req,res)=>{

    Order.update(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
            if(err)
            {
                return res.status(400).json({
                    message:"Unable to update"
                })
            }

            return res.status(200).json(order)
        }

        
    )
}

