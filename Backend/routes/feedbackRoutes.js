const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Feedback routes
router.post('/', feedbackController.createFeedback); // Create new feedback
router.get('/', feedbackController.getAllFeedback); // Get all feedbacks
router.get('/:id', feedbackController.getFeedbackById); // Get feedback by ID
router.put('/:id', feedbackController.updateFeedback); // Update feedback
router.delete('/:id', feedbackController.deleteFeedback); // Delete feedback

module.exports = router;
