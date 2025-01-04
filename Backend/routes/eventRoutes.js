const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const upload = require("../middleware/multerMiddleware");

// Routes for events
router.post('/addEvent',upload.single("image"), eventController.createEvent); 
router.get('/getAllEvent', eventController.getAllEvents); 
router.get('/getEventById/:id', eventController.getEventById); 
router.put('/updateEvent/:id', eventController.updateEvent); 
router.delete('/deleteEvent/:id', eventController.deleteEvent);

module.exports = router;
