const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

// Vendor routes
router.post('/addVendor', vendorController.createVendor); // Create a new vendor
router.get('/getAllVendor', vendorController.getAllVendors); // Get all vendors
router.get('/getVendorById:id', vendorController.getVendorById); // Get vendor by ID
router.put('/updateVendor:id', vendorController.updateVendor); // Update vendor
router.delete('/deleteVendor:id', vendorController.deleteVendor); // Delete vendor

module.exports = router;
