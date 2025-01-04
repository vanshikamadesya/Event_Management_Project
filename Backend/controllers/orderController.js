const Booking = require("../models/bookingModal");
const mongoose = require('mongoose')

exports.getOrderSummary = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Ensure valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ success: false, msg: "Invalid booking ID format" });
    }

    // Fetch booking details with populated user, event, and venue info
    const booking = await Booking.findById(bookingId)
      .populate("userId", "firstname lastname email phonenumber")
      .populate("eventId", "eventName eventPrice")
      .populate("venueId", "venueName costPerHour");

    if (!booking) {
      return res.status(404).json({ success: false, msg: "Booking not found" });
    }

    // Extract costs and details
    const eventCost = booking.eventId ? booking.eventId.eventPrice : 0;
    const venueCost = booking.venueId ? booking.venueId.costPerHour : 0;
    const guestCount = booking.totalGuest || 0;

    // Calculate total cost
    const totalCost = eventCost + venueCost*24 ; // Fixed cost per guest

    // Sending the order summary
    res.status(200).json({
      success: true,
      booking,
      user: booking.userId,
      event: booking.eventId,
      venue: booking.venueId,
      guestCount,
      totalCost,
    });
  } catch (error) {
    console.error("Error in getOrderSummary:", error);
    res.status(500).json({ success: false, msg: "Error fetching order summary", error: error.message });
  }
};
