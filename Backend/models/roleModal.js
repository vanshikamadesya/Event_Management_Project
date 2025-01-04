const mongoose = require('mongoose');

// Define the schema
const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: [true, 'Role name is required'],
    trim: true,
    minlength: [3, 'Role name must be at least 3 characters long'],
    maxlength: [30, 'Role name cannot exceed 30 characters'],
  },
});

// Create the model
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;