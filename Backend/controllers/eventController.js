const Event = require("../models/eventModal"); 
const multer = require('multer');
const path = require('path');

// Set up file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Make sure the "uploads" folder exists
    cb(null, 'uploads/'); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    // Make a unique filename for each uploaded file
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1609459200000.jpg
  },
});

// File validation (only accept images)
const fileFilter = (req, file, cb) => {
  const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (validMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
  }
};

// Set file size limit (5MB)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});


// Controller for Event Management
const EventController = {
  // Create a new event
  createEvent: async (req, res) => {
    try {
      // console.log("Request Body:", req.body); // Log request body
      // console.log("Uploaded File:", req.file); // Log uploaded file details
  
      const { eventName, description, eventPrice } = req.body;
  
      if (!eventName || !description || !eventPrice) {
        return res.status(400).json({ msg: "Event name, description, and price are required" });
      }
  
      const event = new Event({
        eventName,
        description,
        eventPrice,
        image: `${req.protocol}://${req.get('host')}/${req.file.path}`,
      });
  
      await event.save();
      return res.status(201).json({ msg: "Event created successfully", event });
    } catch (error) {
      console.error("Error creating event:", error); // Log any errors
      return res.status(500).json({ msg: "Error creating event", error: error.message });
    }
  },
  
  // Get all events
  getAllEvents: async (req, res) => {
    try {

      const events = await Event.find();
      res.json(events || []); // Return the events or an empty array
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // Get a single event by ID
  getEventById: async (req, res) => {
    try {
      const { id } = req.params;

      const event = await Event.findById(id);
      if (!event) {
        return res
          .status(404)
          .json({ success: false, message: "Event not found" });
      }

      res.status(200).json({ success: true, event });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // Update an event by ID
  updateEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const { eventName, description, eventPrice } = req.body;

      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        { eventName, description, eventPrice },
        { new: true, runValidators: true }
      );

      if (!updatedEvent) {
        return res
          .status(404)
          .json({ success: false, message: "Event not found" });
      }

      res
        .status(200)
        .json({
          success: true,
          message: "Event updated successfully",
          event: updatedEvent,
        });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  // Delete an event by ID
  deleteEvent: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedEvent = await Event.findByIdAndDelete(id);
      if (!deletedEvent) {
        return res
          .status(404)
          .json({ success: false, message: "Event not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Event deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = EventController;
