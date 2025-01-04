const Feedback = require('../models/feedbackModal'); 

// Create new Feedback
exports.createFeedback = async (req, res) => {
  try {
    const { rating, comments, feedbackDate, userId, eventId } = req.body;

    const newFeedback = new Feedback({
      rating,
      comments,
      feedbackDate,
      userId,
      eventId,
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json({ message: 'Feedback created successfully', feedback: savedFeedback });
  } catch (error) {
    res.status(400).json({ message: 'Error creating feedback', error: error.message });
  }
};

// Get all Feedback entries
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('userId', 'firstname lastname') // Populate user details
      .populate('eventId', 'eventName eventDate'); // Populate event details

    res.status(200).json({ feedbacks });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};

// Get Feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedbackId = req.params.id;

    const feedback = await Feedback.findById(feedbackId)
      .populate('userId', 'firstname lastname')
      .populate('eventId', 'eventName eventDate');

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};

// Update Feedback
exports.updateFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const updatedData = req.body;

    const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updated fields
    });

    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback updated successfully', feedback: updatedFeedback });
  } catch (error) {
    res.status(400).json({ message: 'Error updating feedback', error: error.message });
  }
};

// Delete Feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;

    const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);

    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error: error.message });
  }
};
