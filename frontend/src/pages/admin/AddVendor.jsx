import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddVendor = () => {
  const [vendorDetails, setVendorDetails] = useState({
    vendorName: "",
    serviceType: "",
    phone: "",
    email: "",
    rating: 3,
  });

  const handleChange = (e) => {
    setVendorDetails({
      ...vendorDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/addVendor", vendorDetails); 
      toast.success("Vendor added successfully!");
      setVendorDetails({
        vendorName: "",
        serviceType: "",
        phone: "",
        email: "",
        rating: 3, // Reset rating to default value
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Add Vendor</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-medium" htmlFor="vendorName">
                Vendor Name
              </label>
              <input
                type="text"
                id="vendorName"
                name="vendorName"
                value={vendorDetails.vendorName}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium" htmlFor="serviceType">
                Service Type
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={vendorDetails.serviceType}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">Select Service Type</option>
                <option value="Catering">Catering</option>
                <option value="Photography">Photography</option>
                <option value="Decoration">Decoration</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={vendorDetails.phone}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={vendorDetails.email}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium" htmlFor="rating">
                Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={vendorDetails.rating}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                min="1"
                max="5"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded font-medium"
            >
              Add Vendor
            </button>
          </form>
        </div>
      </div>
      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </AdminLayout>
  );
};

export default AddVendor;
