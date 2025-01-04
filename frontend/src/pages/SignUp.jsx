import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonenumber: "",
    // roleId: "67334883ee7a5b191ed64c09"
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/register", formData);

      // Show success toast
      toast.success("Account created successfully!");
      // Navigate to login after a delay
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      // Show error toast
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong.");
      } else {
        toast.error("Unable to connect to the server.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Enter First Name"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Enter Last Name"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              placeholder="Enter Phone Number"
              value={formData.phonenumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Log In
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default SignUpPage;
