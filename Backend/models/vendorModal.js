const mongoose = require('mongoose');
const { isEmail, isMobilePhone } = require('validator');

// Define the Vendor Schema
const vendorSchema = new mongoose.Schema({
 
  vendorName: {
    type: String,
    required: [true, 'Vendor name is required'],
    minlength: [3, 'Vendor name must be at least 3 characters long'],
    maxlength: [100, 'Vendor name cannot exceed 100 characters'],
    trim: true,
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: ['Catering', 'Photography', 'Decoration', 'Entertainment', 'Other'], // Define valid service types
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function (value) {
        return isMobilePhone(value, 'any', { strictMode: false }); 
      },
      message: 'Invalid phone number',
    },
  },
    email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: isEmail,
      message: 'Invalid email format',
    },
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    default: 3, 
  },
});

// Create the Vendor Model
const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
