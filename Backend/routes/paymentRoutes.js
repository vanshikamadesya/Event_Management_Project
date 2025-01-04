const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');


// Create Payment 
router.post("/createPaymentOrder", paymentController.createPaymentOrder);

// Verify Payment
// router.post("/verifyPayment", paymentController.verifyPayment);


module.exports = router;
