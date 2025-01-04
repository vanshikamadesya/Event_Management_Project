const express = require('express');
const { register, login, getUserById, getAllUser, getTotalUsers, updatePassword} = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

// Validation rules
const registerValidation = [
    // body('firstname').isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
    // body('lastname').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
    body('email').isEmail().withMessage('Invalid email format'),
    // body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    // body('phonenumber').isMobilePhone().withMessage('Invalid phone number'),
    // body('roleId').notEmpty().withMessage('Role ID is required'),
  ];
  
  const loginValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ];
  

// Route for user registration
router.post('/register',registerValidation, register);

// This route fetches all users number
router.get('/getAllUser', getAllUser);  

// Route to fetch a user by their ID
router.get('/:userId', getUserById);  

//Route to fetch the total user
router.get('/getUsers', getTotalUsers);

// Route for user login
router.post('/login', loginValidation,login);

// Route to update password
router.post('/updatePassword', updatePassword);
    
module.exports = router;
