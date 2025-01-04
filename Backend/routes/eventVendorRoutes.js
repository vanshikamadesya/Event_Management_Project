const express = require('express');
const router = express.Router();
const eventVendorController = require('../controllers/eventVendorController');

// Routes for EventVendor
router.post('/addEventVendor', eventVendorController.createEventVendor); // Create a new EventVendor
router.get('/getEventVendor', eventVendorController.getAllEventVendors); // Get all EventVendors
router.get('/getEventVendorById:id', eventVendorController.getEventVendorById); // Get an EventVendor by ID
router.put('/updateEventVendor:id', eventVendorController.updateEventVendor); // Update an EventVendor
router.delete('/deleteEventVendor:id', eventVendorController.deleteEventVendor); // Delete an EventVendor

module.exports = router;
