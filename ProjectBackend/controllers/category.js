const Category=require("../models/category.js")


exports.getCategoryById=(req,res,next,id)=>{

    Category.findById(id).exec((err,cate)=>{
        if(err||!user)
        {
            return res.status(400).json({
                message:"Enter the correct id"
            })
        }

        req.category=cate
        next()
        
         
 
    })
}

exports.createCategory=(req,res)=>{
    const category=new Category(req.body)
    category.save().then(category=>{
        res.status(200).json(category)
    }).catch((err)=>{
        res.status(400).send("Error in saving ")
    })
}


exports.getCategory=(req,res)=>{
    
    return res.status(200).json(req.body)
}



exports.getAllCategories=(req,res)=>{

    Category.find({},(err,category)=>{
        if(err)
        {
            return res.status(400).json({
                message:"Enter the correct id"

            })
        }
        return res.status(200).json(category)

    })

}

exports.updateCategory=(req,res)=>{

    const category=req.category
    category.name=req.body.name

    category.save((err,updatedCategory)=>{
        if(err)
        {
            return res.status(400).json({
                message:"Enter the correct id"
            })

        }

        res.status(200).json(updatedCategory)
    })

}

exports.removeCategory=(req,res)=>{

    const category=req.category

    category.remove((err,category)=>{
        if(err)
        {
            return res.status(400).json({
                message:"Enter the correct id"
            })

        }
        res.status(200).json(category)




    })

}