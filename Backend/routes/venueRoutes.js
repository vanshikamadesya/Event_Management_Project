const express = require('express');
const router = express.Router();
const {  upload, VenueController } = require('../controllers/venueController');

// Venue routes
router.post('/addVenue',upload.single('image'), VenueController.createVenue);
router.get('/getAllVenue', VenueController.getAllVenues); 
router.get('/getVenueById/:id', VenueController.getVenueById); 
router.put('/updateVenue/:id', VenueController.updateVenue); 
router.delete('/deleteVenue/:id', VenueController.deleteVenue); 

module.exports = router;
