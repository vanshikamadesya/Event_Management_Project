import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext"; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import LoginImage from "../assets/login2.svg";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); 


  const { login } = useAuth(); // Get login function from context
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
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );
      const { token, role, userId } = response.data;

      if (!role || !userId) {
        toast.error("Role or User ID not found in response.");
        return;
      }

      // Use the login function from context
      login(token, { role, userId });

      toast.success("Login successful!");

      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "User") {
        navigate("/");
      }else if (role  === "EventManager"){
        navigate("/organizer");
      } else {
        toast.error("Role not recognized!");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg || "Something went wrong.");
      } else {
        toast.error("Unable to connect to the server.");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center mt-14 bg-gray-200">
      {/* Left Side - Image */}
      <div className="hidden md:block w-1/2 -ml-12">
        <img
          src={LoginImage}
          alt="Login"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center mt-14 justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-lg font-semibold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-lg font-semibold mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-lg" />
                  ) : (
                    <FaEye className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
            <p className="text-center text-gray-700">
              Don't have an account?
              <a href="/sign-up" className="text-blue-500 hover:underline ml-1">
                Sign up here
              </a>
            </p>
          </form>
        </div>
      </div>
      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default LoginPage;
