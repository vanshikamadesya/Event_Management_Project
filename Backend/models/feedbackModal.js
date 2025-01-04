const mongoose = require('mongoose');

// Define the Feedback Schema
const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
  },
  comments: {
    type: String,
    maxlength: [500, 'Comments cannot exceed 500 characters'],
    trim: true,
  },
  feedbackDate: {
    type: Date,
    required: [true, 'Feedback date is required'],
    validate: {
      validator: function (value) {
        return value <= new Date(); 
      },
      message: 'Feedback date cannot be in the future',
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: [true, 'User ID is required'],
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', 
    required: [true, 'Event ID is required'],
  },
});

// Create the Feedback Model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
