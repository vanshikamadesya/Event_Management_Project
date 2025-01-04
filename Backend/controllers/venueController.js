const Venue = require("../models/venueModal");
const multer = require("multer");
const path = require("path");

// Set up file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File validation (only accept images)
const fileFilter = (req, file, cb) => {
  const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  if (validMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
  }
};

// Set file size limit (5MB)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});

// Venue Controller
const VenueController = {
  createVenue: async (req, res) => {
    try {
      console.log("Request Body:", req.body);  // Logs form data
      console.log("Uploaded File:", req.file);  // Logs the file details

      if (!req.file) {
        return res.status(400).json({ msg: "Please upload an image." });
      }

      const { venueName, location, capacity, costPerHour, description, availability } = req.body;

      if (!venueName || !location || !capacity || !costPerHour || !description || availability === undefined) {
        return res.status(400).json({ msg: "All fields are required." });
      }

      const venue = new Venue({
        venueName,
        location,
        capacity,
        costPerHour,
        description,
        image: `${req.protocol}://${req.get('host')}/${req.file.path}`,
        availability,
        
      });

      await venue.save();
      return res.status(201).json({ msg: "Venue created successfully", venue });
    } catch (error) {
      console.error("Error creating venue:", error);
      return res.status(500).json({ msg: "Error creating venue", error: error.message });
    }
  },

  // Get all venues
  getAllVenues: async (req, res) => {
    try {
      const venues = await Venue.find();
      res.status(200).json(venues || []);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // Get a single venue by ID
  getVenueById: async (req, res) => {
    try {
      const { id } = req.params;

      const venue = await Venue.findById(id);
      if (!venue) {
        return res.status(404).json({ success: false, message: "Venue not found" });
      }

      res.status(200).json({ success: true, venue });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // Update a venue by ID
  updateVenue: async (req, res) => {
    try {
      const { id } = req.params;
      const { venueName, location, capacity, costPerHour, description, availability } = req.body;
      const updateData = {
        venueName,
        location,
        capacity,
        costPerHour,
        description,
        availability,
      };

      if (req.file) {
        updateData.image = req.file.path; // Update image if provided
      }

      const updatedVenue = await Venue.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedVenue) {
        return res.status(404).json({ success: false, message: "Venue not found" });
      }

      res.status(200).json({ success: true, message: "Venue updated successfully", venue: updatedVenue });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  // Delete a venue by ID
  deleteVenue: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedVenue = await Venue.findByIdAndDelete(id);
      if (!deletedVenue) {
        return res.status(404).json({ success: false, message: "Venue not found" });
      }

      res.status(200).json({ success: true, message: "Venue deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = {
  VenueController,
  upload,
};
