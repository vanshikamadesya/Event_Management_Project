const mongoose = require('mongoose');

// Define the Booking Schema
const bookingSchema = new mongoose.Schema({
  // eventType: {
  //   type: String,
  //   required: [true, 'Event type is required'],
  //   enum: ['Wedding', 'Birthday', 'Corporate', 'Other'], // Define valid event types
  // },
  eventDate: {
    type: Date,
    required: [true, 'Event date is required'],
    validate: {
      validator: function (value) {
        return value >= new Date();
      },
      message: 'Event date cannot be in the past',
    },
  },
  totalGuest: {
    type: Number,
    required: [true, 'Total number of guests is required'],
    min: [1, 'There must be at least 1 guest'],
  },
  services: {
    type: [String], 
    enum: ['Invitation', 'Photo & Video', 'Beauty & Makeup', 'Wedding Flowers', 'Wedding Cake', 'Music Band', 'Catering', 'Venues'],
    required: [true, 'At least one service is required'],
  },

  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Confirmed', 'Canceled'], 
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed', 'Failed'], 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Foreign key referencing the User model
    required: [true, 'User ID is required'],
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Foreign key referencing the Event model
    required: [true, 'Event ID is required'],
  },
  venueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue', // Foreign key referencing the Venue model
    required: [true, 'Venue ID is required'], 
  }, 

});

// Create the Booking Model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
