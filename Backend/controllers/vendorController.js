const Vendor = require('../models/vendorModal'); 

// Create a new vendor
exports.createVendor = async (req, res) => {
  try {
    const { vendorName, serviceType, phone, email, rating } = req.body;

    const newVendor = new Vendor({
      vendorName,
      serviceType,
      phone,
      email,
      rating,
    });

    const savedVendor = await newVendor.save();
    res.status(201).json({ message: 'Vendor created successfully', vendor: savedVendor });
  } catch (error) {
    res.status(400).json({ message: 'Error creating vendor', error: error.message });
  }
};

// Get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json({ vendors });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vendors', error: error.message });
  }
};

// Get vendor by ID
exports.getVendorById = async (req, res) => {
  try {
    const vendorId = req.params.id;

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json({ vendor });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vendor', error: error.message });
  }
};

// Update vendor
exports.updateVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const updates = req.body;

    const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json({ message: 'Vendor updated successfully', vendor: updatedVendor });
  } catch (error) {
    res.status(400).json({ message: 'Error updating vendor', error: error.message });
  }
};

// Delete vendor
exports.deleteVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;

    const deletedVendor = await Vendor.findByIdAndDelete(vendorId);

    if (!deletedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vendor', error: error.message });
  }
};
