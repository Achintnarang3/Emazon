const express = require("express")
const { isSignedIN, isAuthenticated } = require('../controllers/auth.js');
const { getToken, processPayment } = require("../controllers/payment")
const { getUserById } = require('../controllers/user');
const router = express.Router()

router.param("userID" , getUserById);

router.get("/gettoken/:userID", isSignedIN, isAuthenticated, getToken)

router.post("/braintree/:userID", isSignedIN, isAuthenticated, processPayment)

module.exports=router