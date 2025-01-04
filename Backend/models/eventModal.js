const mongoose = require('mongoose');

// Define the Event Schema
const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: [true, 'Event name is required'],
    minlength: [3, 'Event name must be at least 3 characters long'],
    maxlength: [100, 'Event name cannot exceed 100 characters'],
    trim: true,
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    trim: true,
  },
  eventPrice: {
    type: Number,
    required: [true, 'Event price is required'],
    min: [0, 'Event price must be at least 0'],
    max: [1000000, 'Event price cannot exceed 100,000'], // Adjust as needed
  },
  image: {
    type: String,
    required: true, // Set to true if every event must have an image
  },

 
});

// Create the Event Model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
