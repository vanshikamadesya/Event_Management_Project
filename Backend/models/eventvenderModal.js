const mongoose = require('mongoose');

// Define the EventVendor Schema
const eventVendorSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Foreign key referencing the Event model
    required: [true, 'Event ID is required'],
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor', // Foreign key referencing the Vendor model
    required: [true, 'Vendor ID is required'],
  },
  servicesProvided: {
    type: [String], // Array of services provided by the vendor for the event
    required: [true, 'Services provided are required'],
  },
  cost: {
    type: Number,
    required: [true, 'Cost is required'],
    min: [0, 'Cost must be a non-negative value'],
  },
  // status: {
  //   type: String,
  //   enum: ['Pending', 'Confirmed', 'Cancelled'],
  //   default: 'Pending', // Default status is 'Pending'
  // },
});

// Create the EventVendor Model
const EventVendor = mongoose.model('EventVendor', eventVendorSchema);

module.exports = EventVendor;
