const Booking = require("../models/bookingModal");

const BookingController = {
  // Create a new booking
  createBooking: async (req, res) => {
    try {
      const { eventDate, totalGuest, services, userId, eventId, venueId } =
        req.body;

      // Set default values
      const status = "Pending";
      const paymentStatus = "Pending";

      // Create a new booking document
      const booking = new Booking({
        // eventType,
        eventDate,
        totalGuest,
        services,
        status,
        paymentStatus,
        userId,
        eventId,
        venueId,
      });

      // Save the booking to the database
      await booking.save();

      res.status(201).json({
        success: true,
        bookingId: booking._id,
        message: "Booking created successfully!",
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  // Get all bookings
  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate("userId", "name email") 
        .populate("eventId", "eventName description") 
        .populate("venueId", "name location capacity"); 

      res.status(200).json({ success: true, bookings });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // Get total count of bookings
  getBookingCount: async (req, res) => {
    try {
      // Count the total number of bookings
      const totalBookings = await Booking.countDocuments();

      // Return the count of bookings
      res.status(200).json({ success: true, totalBookings });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // Get a booking by ID
  getBookingById: async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id)
        .populate("userId", " email")
        .populate("eventId", "eventName eventDate");
      console.log(booking);
      if (!booking)
        return res
          .status(404)
          .json({ success: false, msg: "Booking not found" });
      res.status(200).json({
        success: true,
        msg: "Booking retrieved successfully",
        booking,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "Error fetching booking",
        error: error.message,
      });
    }
  },

  // Get bookings for a specific user
  getBookingsByUserId: async (req, res) => {
    const { userId } = req.params;

    try {
      const bookings = await Booking.find({ userId })
        .populate("eventId", "eventName eventDate")
        .populate("venueId", "name location");

      const currentDate = new Date();
      const pastBookings = bookings.filter(
        (booking) => new Date(booking.eventDate) < currentDate
      );
      const upcomingBookings = bookings.filter(
        (booking) => new Date(booking.eventDate) >= currentDate
      );

      res.status(200).json({
        success: true,
        pastBookings,
        upcomingBookings,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update a booking by ID
  updateBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        eventType,
        eventDate,
        totalGuest,
        services,
        status,
        paymentStatus,
        userId,
        eventId,
        venueId,
      } = req.body;

      const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        {
          eventType,
          eventDate,
          totalGuest,
          services,
          status,
          paymentStatus,
          userId,
          eventId,
          venueId,
        },
        { new: true, runValidators: true }
      );

      if (!updatedBooking) {
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });
      }

      res.status(200).json({
        success: true,
        message: "Booking updated successfully",
        booking: updatedBooking,
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  //Update the booking status
  updateBookingStatus: async (req, res) => {
    try { 
      const { id } = req.params; 
      const { status } = req.body; 
  
      // Ensure the status is valid
      const validStatuses = ['Confirmed', 'Pending', 'Canceled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status provided.',
        });
      }
  
      // Find and update the booking's status
      const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );
  
      if (!updatedBooking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found.',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Booking status updated successfully.',
        booking: updatedBooking,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err.message,
      });
    }
  },
  

  // Delete a booking by ID
  deleteBooking: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedBooking = await Booking.findByIdAndDelete(id);

      if (!deletedBooking) {
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Booking deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = BookingController;
