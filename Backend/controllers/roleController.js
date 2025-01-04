const Role = require('../models/roleModal'); 

// Controller to add a new role
exports.addRole = async (req, res) => {
  const { roleName } = req.body;

  try {
    // Check if role already exists
    const existingRole = await Role.findOne({ roleName });
    if (existingRole) {
      return res.status(400).json({ message: 'Role already exists' });
    }

    // Create a new role
    const role = new Role({ roleName });
    await role.save();

    res.status(201).json({ message: 'Role created successfully', role });
  } catch (error) {
    res.status(500).json({ message: 'Error creating role', error: error.message });
  }
};
