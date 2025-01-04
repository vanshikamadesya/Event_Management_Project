const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Route for fetching order summary
router.get("/:bookingId", orderController.getOrderSummary);

module.exports = router;
