const express=require("express")
const router=express.Router()

const {signout,signup,signin,isSignedIN,isAdmin, isAuthenticated}= require('../controllers/auth.js');
const {getUserById,pushOrderInPurchaseList}=require("../controllers/user")
 const {getOrderById,createOrder,getAllOrder,getOrderStatus, updateOrderStatus}=require('../controllers/order.js')
const {updateStock}=require('../controllers/product.js')

router.param('userId',getUserById)
router.param('orderId',getOrderById)

router.post("/create/:userId",isSignedIN,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)

// Get all order
router.get("/getAllOrder/:userId",isSignedIN,isAuthenticated,isAdmin,getAllOrder)

// Order status
router.get("/status/:userId",isSignedIN,isAuthenticated,isAdmin,getOrderStatus)
// Update order status
router.put("/:orderId/status/:userId",isSignedIN,isAuthenticated,isAdmin,updateOrderStatus)

module.exports=router