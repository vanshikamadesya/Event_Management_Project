import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddVenue = () => {
  const [formData, setFormData] = useState({
    venueName: "",
    location: "",
    capacity: "",
    costPerHour: "",
    availability: true,
    description: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(selectedFile);  // This will log the file object to the console
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file) {
      toast.error("Please upload an image.");
      return;
    }
  
    const data = new FormData();
    data.append("venueName", formData.venueName);
    data.append("location", formData.location);
    data.append("capacity", formData.capacity);
    data.append("costPerHour", formData.costPerHour);
    data.append("availability", formData.availability);
    data.append("description", formData.description);
    data.append("image", file);  // Ensure you're appending the file here

  
    try {
      await axios.post("http://localhost:3000/api/addVenue", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.success("Venue added successfully!");
      setFormData({
        venueName: "",
        location: "",
        capacity: "",
        costPerHour: "",
        availability: true,
        description: "",
      });
      setFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };
  
  return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6 text-center">Add Venue</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="venueName" className="block mb-2 font-medium">
                  Venue Name
                </label>
                <input
                  type="text"
                  id="venueName"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  placeholder="Enter venue name"
                  required
                />
              </div>

              <div>
                <label htmlFor="location" className="block mb-2 font-medium">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  placeholder="Enter venue location"
                  required
                />
              </div>

              <div>
                <label htmlFor="capacity" className="block mb-2 font-medium">
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  placeholder="Enter capacity"
                  required
                />
              </div>

              <div>
                <label htmlFor="costPerHour" className="block mb-2 font-medium">
                  Cost per Hour
                </label>
                <input
                  type="number"
                  id="costPerHour"
                  name="costPerHour"
                  value={formData.costPerHour}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  placeholder="Enter cost per hour"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="availability" className="block mb-2 font-medium">
                Availability
              </label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block mb-2 font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                placeholder="Enter venue description"
                rows="4"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="image" className="block mb-2 font-medium">
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
            >
              Add Venue
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </AdminLayout>
  );
};

export default AddVenue;
