const Product=require("../models/product.js")
const formidable=require("formidable")
const fs=require("fs")
const _ =require("lodash")
const { check,validationResult} = require('express-validator');


exports.productById=(req,res,next,id)=>{
    Product.findById(id).exec((err,pro)=>{
        if(err)
        {
            return res.status(400).json({
                message:"Enter the correct id"
            })
        }

        req.product=pro
        next()
        
         
 
    })

}

exports.createProduct=(req,res)=>{
    
    const errors=validationResult(req)

    if(!errors.isEmpty())
    {
        return res.json({
            error:errors.array()[0].msg
        })
    }


    const form = formidable();

    form.parse(req,(err,field,file)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Error in Creating Product"
            })
        }

        const product=new Product(field)

        if(file.photo)
        {
            if(file.photo.size>300000)
            {
                return res.status(400).json({
                    error:"File Too Big"
                })
    

            }
        }

        

        product.photo.data=fs.readFileSync(file.photo.path)
        product.photo.contentType=file.photo.type

        product.save((err,product)=>{
            if(err)
            {
                return res.json({
                    error:"Unable to save"
                })
            }

            return res.json(product)
        })
        
    })



}

exports.getProduct=(req,res)=>{

    req.product.photo=undefined
    res.status(200).json(req.product)
}

exports.photo=(req,res,next)=>{

    if(req.product.photo.data)
    {
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }

    next()


}

exports.updateProduct=(req,res)=>{
     

    const form = formidable();

    form.parse(req,(err,field,file)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Error in Creating Product"
            })
        }
        
        // Update Product using lodash
        const product=req.product
        product =_.extend(product,field)


        if(file.photo)
        {
            if(file.photo.size>300000)
            {
                return res.status(400).json({
                    error:"File Too Big"
                })
    

            }
        }

        

        product.photo.data=fs.readFileSync(file.photo.path)
        product.photo.contentType=file.photo.type

        product.save((err,product)=>{
            if(err)
            {
                return res.json({
                    error:"Updation Fail"
                })
            }

            return res.json(product)
        })
        
    })


}

exports.deleteProduct=(req,res)=>{
   
    const product=req.product

    product.remove((err,deletedProduct)=>{
        if(err)
        {
            return res.status(400).json({
                Message:"Unable to delete"
            })
        }

        return res.status(200).json({
            Message:"Succesfully deleted"
        })


    })
}

exports.getAllProducts=(req,res)=>{

    let limit=req.query.limit?parseInt(req.query.limit):8
    let sortBy=req.query.sortBy?req.query.sortBy:"_id"

    Product.find().
    populate("category")
    select("-photo").
    sort([[sortBy,"asc"]]).
    exec((err,product)=>{
        if(err)
        {
            return res.status(400).json({
                message:"No product found"
            })
        }
        res.json(product)
    })

}

exports.getUniqueCategory=(req,res)=>{
    Product.distinct("category",{},(err,category)=>{

        if(err)
        {
            return res.status(400).json({
                message:"No Category"
            })

        }

        return res.status(200).json(category)
    })
}

exports.updateStock=(req,res,next)=>{
    let myoperations= req.body.order.getAllProducts.map(pro=>{

        return {
            updateOne:{
                filter:{_id:pro._id},
                update:{$inc:{stock:pro.count,sold:pro.count}}
            }
        }
    }
    )

    Product.bulkWrite(myoperations,{},(err,products)=>{
        if(err)
        {
            return res.status(400).json({
                message:"Failed in doing bulk write"
            })

        }

        next()
    })
}