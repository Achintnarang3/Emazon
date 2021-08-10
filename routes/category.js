const express=require('express')

const router=express.Router()

const {getUserById}=require("../controllers/user")
const {getCategoryById,
    createCategory,
    getCategory,
    getAllCategories,
    updateCategory,
    removeCategory } = require("../controllers/category")

const {isSignedIN,isAdmin,isAuthenticated}= require('../controllers/auth.js')


router.get("/getAllCategory",getAllCategories)


// Params
router.param("userId",getUserById)
router.param("categoryId",getCategoryById)

// Routes
router.post("/create/:userId",isSignedIN,isAuthenticated,isAdmin,createCategory)
router.get("/getCategory/:categoryId",getCategory)
router.put("/update/:categoryID/:userId",isSignedIN,isAuthenticated,isAdmin,updateCategory)

router.delete("/delete/:categoryID/:userId",isSignedIN,isAuthenticated,isAdmin,removeCategory)





module.exports=router