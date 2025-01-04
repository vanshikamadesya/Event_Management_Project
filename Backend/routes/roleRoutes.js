const express = require('express');
const { addRole } = require('../controllers/roleController');
const router = express.Router();

// Route to add a new role
router.post('/add', addRole);

module.exports = router;
