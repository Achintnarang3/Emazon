const express=require("express")
const router=express.Router()
const {check } = require('express-validator');

//Controllers
const {productById,createProduct,
    getProduct,photo,deleteProduct,
    updateProduct,getAllProducts,
    getUniqueCategory}=require('../controllers/product.js')
const {getUserById}=require("../controllers/user")
const {signout,signup,signin,isSignedIN,isAdmin, isAuthenticated}= require('../controllers/auth.js');
 


router.param('userId',getUserById)
router.param("productId",productById)

router.post('/createProduct/:userId',isSignedIN,isAuthenticated,isAdmin,[

    check('name','Name should be present').isLength({min:1}),
    check('description','description should be present').isLength({min:1}),
    check('price','Price should be present').isLength({min:1}),
],createProduct) 

// View product
router.get('/getProduct/:productId',getProduct)
router.get('/getProduct/photo/:productId',photo)
router.get('/getAllProducts',getAllProducts)
router.get('/getUniqueCategory',getUniqueCategory)

// Delete Product
router.delete('/:productId/:userId',isSignedIN,isAuthenticated,isAdmin,deleteProduct)
 

// Update Product
router.put('/:productId/:userId',isSignedIN,isAuthenticated,isAdmin,updateProduct)

module.exports=router

