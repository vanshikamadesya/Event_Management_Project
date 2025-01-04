const EventVendor = require('../models/eventvenderModal'); 

// Create a new EventVendor
exports.createEventVendor = async (req, res) => {
  try {
    const { eventId, vendorId, servicesProvided, cost, status } = req.body;

    // Create a new EventVendor instance
    const newEventVendor = new EventVendor({
      eventId,
      vendorId,
      servicesProvided,
      cost,
      status,
    });

    // Save to the database
    const savedEventVendor = await newEventVendor.save();
    res.status(201).json({ message: 'EventVendor created successfully', eventVendor: savedEventVendor });
  } catch (error) {
    res.status(400).json({ message: 'Error creating EventVendor', error: error.message });
  }
};

// Get all EventVendor entries
exports.getAllEventVendors = async (req, res) => {
  try {
    // Populate event and vendor details
    const eventVendors = await EventVendor.find()
      .populate('eventId', 'eventName eventDate')
      .populate('vendorId', 'vendorName contactInfo');

    res.status(200).json({ eventVendors });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching EventVendor entries', error: error.message });
  }
};

// Get an EventVendor by ID
exports.getEventVendorById = async (req, res) => {
  try {
    const eventVendorId = req.params.id;

    // Find by ID and populate details
    const eventVendor = await EventVendor.findById(eventVendorId)
      .populate('eventId', 'eventName eventDate')
      .populate('vendorId', 'vendorName contactInfo');

    if (!eventVendor) {
      return res.status(404).json({ message: 'EventVendor not found' });
    }

    res.status(200).json({ eventVendor });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching EventVendor', error: error.message });
  }
};

// Update an EventVendor
exports.updateEventVendor = async (req, res) => {
  try {
    const eventVendorId = req.params.id;
    const updatedData = req.body;

    // Update the entry
    const updatedEventVendor = await EventVendor.findByIdAndUpdate(eventVendorId, updatedData, {
      new: true, // Return updated document
      runValidators: true, // Validate updated data
    });

    if (!updatedEventVendor) {
      return res.status(404).json({ message: 'EventVendor not found' });
    }

    res.status(200).json({ message: 'EventVendor updated successfully', eventVendor: updatedEventVendor });
  } catch (error) {
    res.status(400).json({ message: 'Error updating EventVendor', error: error.message });
  }
};

// Delete an EventVendor
exports.deleteEventVendor = async (req, res) => {
  try {
    const eventVendorId = req.params.id;

    // Delete the entry
    const deletedEventVendor = await EventVendor.findByIdAndDelete(eventVendorId);

    if (!deletedEventVendor) {
      return res.status(404).json({ message: 'EventVendor not found' });
    }

    res.status(200).json({ message: 'EventVendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting EventVendor', error: error.message });
  }
};
