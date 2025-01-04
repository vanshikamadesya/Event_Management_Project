const Razorpay = require("razorpay");
const Payment = require("../models/paymentModal");
const Booking = require("../models/bookingModal");

const razorpay = new Razorpay({
  key_id: "rzp_test_Gd862noZ7vPnYB", 
  key_secret: "sy5NHdVP21qtXelMtzlDJ8yB", 
});

// Controller to create a Razorpay payment order
exports.createPaymentOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ success: false, msg: "Booking ID is required" });
    }

    // Fetch booking details and calculate the total amount
    const booking = await Booking.findById(bookingId)
      .populate("eventId", "eventPrice")
      .populate("venueId", "costPerHour");

    if (!booking) {
      return res.status(404).json({ success: false, msg: "Booking not found" });
    }

    const eventCost = booking.eventId ? booking.eventId.eventPrice : 0;
    const venueCost = booking.venueId ? booking.venueId.costPerHour * 24 : 0; // Assuming 24 hours for a day
    const totalCost = eventCost + venueCost;

    // Create Razorpay order
    const options = {
      amount: totalCost * 100, 
      currency: "INR",
      receipt: `receipt_${bookingId}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save payment details in the database immediately (without verifying)
    const payment = new Payment({
      bookingId: bookingId,
      paymentDate: new Date(),
      totalAmount: totalCost,
      transactionId: razorpayOrder.id, 
    });

    await payment.save();

    // Respond with order details
    res.status(201).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: totalCost,
      currency: "INR",
    });
  } catch (error) {
    console.error("Error in createPaymentOrder:", error);
    res.status(500).json({ success: false, msg: "Error creating payment order", error: error.message });
  }
};


// // Controller to verify Razorpay payment

// exports.verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, amount } = req.body;

//     // Validate input
//     if (!razorpay_order_id || !razorpay_payment_id || !amount) {
//       return res.status(400).json({ success: false, msg: "Missing required payment details" });
//     }

//     // Convert razorpay_order_id to a valid bookingId (ObjectId)
//     const bookingId = razorpay_order_id.split("_")[1]; // Extract booking ID from the order receipt

//     // Convert bookingId to ObjectId
//     const validBookingId = mongoose.Types.ObjectId(bookingId);

//     if (!validBookingId) {
//       return res.status(400).json({ success: false, msg: "Invalid booking ID format" });
//     }

//     // Parse totalAmount properly
//     const totalAmount = parseFloat(amount); // Ensure it's a valid number

//     if (isNaN(totalAmount)) {
//       return res.status(400).json({ success: false, msg: "Invalid amount" });
//     }

//     // Save payment details to the database
//     const payment = new Payment({
//       bookingId: validBookingId, // Store valid ObjectId
//       paymentDate: new Date(),
//       totalAmount: totalAmount, // Store parsed totalAmount
//       transactionId: razorpay_payment_id,
//     });

//     await payment.save();
    
//     // Log successful payment
//     res.status(200).json({ success: true, msg: "Payment saved successfully" });
//   } catch (error) {
//     console.error("Error saving payment details:", error);
//     res.status(500).json({ success: false, msg: "Error processing payment", error: error.message });
//   }
// };
