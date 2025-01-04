import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from './AdminLayout';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    eventPrice: '',
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };
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
    data.append("eventName", formData.eventName.trim());
    data.append("description", formData.description.trim());
    data.append("eventPrice", formData.eventPrice.trim());
    if (file) data.append("image", file);
      
    try {
      const response = await axios.post("http://localhost:3000/api/addEvent", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
        
      toast.success(response.data.msg);
      setFormData({ eventName: "", description: "", eventPrice: "" });
      setFile(null);
    } catch (error) {
      console.error("Error creating event:", error.response?.data || error.message); // Log the error
      toast.error(error.response?.data?.msg || "Something went wrong.");
    }
  };
  
return (
    <AdminLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 mb-12 rounded-lg shadow-lg w-full max-w-lg space-y-4" >
          <h1 className="text-2xl font-bold mb-6 text-center">Add Event</h1>

          <div>
            <label htmlFor="eventName" className="block text-lg font-semibold">Event Name</label>
            <input
              type="text"
              name="eventName"
              id="eventName"
              placeholder="Enter Event Name"
              value={formData.eventName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-semibold">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="eventPrice" className="block text-lg font-semibold">Event Price</label>
            <input
              type="number"
              name="eventPrice"
              id="eventPrice"
              placeholder="Enter Event Price"
              value={formData.eventPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-lg font-semibold">Event Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>

          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Create Event
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </AdminLayout>
  );
};

export default AddEvent;
