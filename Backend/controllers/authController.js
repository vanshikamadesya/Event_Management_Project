const User = require("../models/userModal");
const Role = require("../models/roleModal");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
// const bcrypt = require('bcrypt')


//Register a new user
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({
        success: false,
        msg: "Validation failed",
        errors: errors.array(),
      });
  }

  try {
    const { firstname, lastname, email, password, phonenumber } = req.body;

    // Fetch default role ID for "User" (ensure correct case)
    const userRole = await Role.findOne({ roleName: "User" });
    if (!userRole) {
      return res
        .status(500)
        .json({ message: "Default user role not found in the database" });
    }

    // **Hash the password**
    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstname,
      lastname,
      email,
      password,
      phonenumber,
      roleId: userRole._id,
    });

    await user.save();
    res
      .status(201)
      .json({ success: true, msg: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        msg: "Error registering user",
        error: error.message,
      });
  }
};


// Get all users 
exports.getTotalUsers = async (req, res) => {
  console.log('Fetching all users...');  // Log to check if the function is called

  try {
    const users = await User.find().populate("roleId", "roleName");
    
    // If no users are found
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        msg: 'No users found',
      });
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log('Error in fetching users:', error);  // Log error
    res.status(500).json({
      success: false,
      msg: 'Error fetching users',
      error: error.message,
    });
  }
};

// Get user information by ID
exports.getUserById = async (req, res) => {
  try {
  const userId = req.params.userId;

  const user = await User.findById(userId).populate('roleId', 'roleName');
  
    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// Get total count of users
exports.getAllUser = async (req, res) => {
  try {
    // Count the total number of users
    const totalUsers = await User.countDocuments();

    // Return the count of users
    res.status(200).json({ success: true, totalUsers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// Login an existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ success: false, msg: "Invalid email" });
    }

    if (user.password !== password) {
      // console.log("Invalid password");
      return res.status(400).json({ success: false, msg: "Invalid password" });
    }

    // Fetch role from the roles collection using roleId
    const role = await Role.findById(user.roleId);
    if (!role) {
      return res.status(400).json({ success: false, msg: 'Role not found for user.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, roleId: user.roleId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // console.log('Token generated successfully:', token);
    res.json({
      success: true,
      msg: "Login successful",
      token,
      role: role.roleName,
      userId: user._id,  
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res
      .status(500)
      .json({ success: false, msg: "Error logging in", error: error.message });
  }
};


// Update password for logged-in user
exports.updatePassword = async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Check if the old password matches
    if (user.password !== oldPassword) {
      return res.status(400).json({ success: false, msg: "Old password is incorrect" });
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, msg: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error updating password", error: err.message });
  }
};
