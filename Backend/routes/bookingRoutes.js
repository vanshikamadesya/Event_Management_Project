const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Routes for bookings
router.post('/bookEvent', bookingController.createBooking); // Create a new booking
router.get('/getAllBooking', bookingController.getAllBookings); // Get all bookings
router.get('/getBookingById/:id', bookingController.getBookingById); // Get a booking by ID
router.get('/getUserBooking/:userId',bookingController.getBookingsByUserId) // Get booking of specific user
router.put('/updateBooking/:id', bookingController.updateBooking); // Update a booking
router.delete('/deleteBooking/:id', bookingController.deleteBooking); // Delete a booking
router.get('/getBookingCount',bookingController.getBookingCount)
router.put('/updateStatus/:id',bookingController.updateBookingStatus)
module.exports = router;
