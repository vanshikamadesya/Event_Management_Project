const mongoose = require('mongoose');

// Define the Venue Schema
const venueSchema = new mongoose.Schema({
  venueName: {
    type: String,
    required: [true, 'Venue name is required'],
    minlength: [3, 'Venue name must be at least 3 characters long'],
    maxlength: [100, 'Venue name cannot exceed 100 characters'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Address is required'],
    maxlength: [300, 'Address cannot exceed 300 characters'],
    trim: true,
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1'],
  },
  costPerHour: {
    type: Number,
    required: [true, 'Cost per hour is required'],
    min: [0, 'Cost per hour must be a positive value'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  availability: {
    type: Boolean,
    required: [true, 'Availability status is required'],
  },
});

// Create the Venue Model
const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
