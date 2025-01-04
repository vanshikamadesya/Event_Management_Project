const mongoose = require('mongoose');

// Define the Payment Schema
const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking', 
    required: [true, 'Booking ID is required'],
  },
  paymentDate: {
    type: Date,
    required: [true, 'Payment date is required'],
    validate: {
      validator: function (value) {
        return value <= new Date(); 
      },
      message: 'Payment date cannot be in the future',
    },
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total Amount is required'],
    min: [0, 'Total Amount must be a non-negative value'],
  },
  transactionId: {
    type: String,
    required: [true, 'Transaction ID is required'],
    unique: true,
  },  
});

// Create the Payment Model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
