import React, { useState } from 'react';

// Import static image
import contactImage from '../assets/contact.jpg';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API or email)
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="py-16 bg-gradient-to-r from-pink-100 via-white to-yellow-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center">
        
        {/* Left Side (Image Section) */}
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <img
            src={contactImage}
            alt="Contact Us"
            className="w-full h-72 md:h-96 object-cover rounded-lg shadow-xl hover:scale-105 transform transition duration-500"
          />
        </div>

        {/* Right Side (Form Section) */}
        <div className="w-full md:w-1/2 md:pl-12">
          <div className="text-center md:text-left mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-lg mt-4 text-gray-600">
              We would love to hear from you! Whether you have a question or need assistance, we're here to help.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg mx-auto"
          >
            {/* Name Input */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 text-lg font-semibold mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-lg font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Message Input */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 text-lg font-semibold mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
                placeholder="Write your message here"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
