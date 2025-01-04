import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaCalendarCheck, FaLock } from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [pastBookings, setPastBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [activeSection, setActiveSection] = useState("profile");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // Load user data from session storage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.userId) {
        // Fetch additional user details from the API
        fetch(`http://localhost:3000/api/auth/${parsedUser.userId}`)
          .then((response) => response.json())
          .then((data) => {
          setUser(data.user);
          fetchUserBookings(parsedUser.userId); // Fetch bookings using the userId

          })
          .catch((err) => console.error("Error fetching user details:", err));
      } else {
        console.error("User ID is missing.");
      }
    }
  }, []);

  // Fetch user bookings
  const fetchUserBookings = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/getUserBooking/${userId}`
      );
  
      if (response.data.success) {
        const { pastBookings, upcomingBookings } = response.data;
        setPastBookings(pastBookings);
        setUpcomingBookings(upcomingBookings);

  
        // Log state to confirm the values
        console.log('Upcoming Bookings:', upcomingBookings);
        console.log('Past Bookings:', pastBookings);
      } else {
        console.error("No bookings found.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error.response?.data || error.message);
    }
  };

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    // Retrieve user information from sessionStorage
    const storedUser = sessionStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (!parsedUser || !parsedUser.userId) {
      setPasswordMessage("User not found in session.");
      return;
    }

    const userId = parsedUser.userId;

    if (newPassword !== confirmPassword) {
      setPasswordMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/updatePassword",
        {
          userId, 
          oldPassword,
          newPassword,
        }
      );

      if (response.data.success) {
        toast.success("Password updated successfully.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordMessage(
          response.data.message || "Failed to update password."
        );
      }
    } catch (error) {
      setPasswordMessage(
        error.response?.data?.message ||
          "Error updating password. Please try again."
      );
    }
  };

  // Fetch bookings when section changes
  useEffect(() => {
    if (activeSection === "bookings" && user && user.userId) {
      fetchUserBookings(parsedUser.userId); 
    }
  }, [activeSection, user]);

  return (
    <div className="flex h-screen p-0">
      {/* Sidebar */}
      
      <aside className="w-1/6 bg-gray-800 text-white p-6 mb-1">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="mt-6">
          <ul>
            <li>
              <NavLink
                to="#"
                onClick={() => handleSectionChange("profile")}
                className="flex items-center p-2 hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                <FaUser className="mr-2 text-lg" /> My Profile
                </NavLink>
            </li>
            <li>
              <NavLink
                to="#"
                onClick={() => handleSectionChange("bookings")}
                className="flex items-center p-2 hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                <FaCalendarCheck className="mr-2 text-lg" /> My Bookings
                </NavLink>
            </li>
            <li>
              <NavLink
                to="#"
                onClick={() => handleSectionChange("forgotPassword")}
                className="flex items-center p-2 hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                <FaLock className="mr-2 text-lg" /> Change Password
                </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {/* Profile Section */}
        {activeSection === "profile" && (
          <section id="user-info" className="mb-12">
            <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">
              My Profile
            </h3>
            {user ? (
              <div className="bg-white shadow-xl p-8 rounded-lg max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-600">
                      {user.firstname?.[0] || "U"}
                      {user.lastname?.[0] || "N"}
                    </div>
                    <div>
                      <h4 className="text-3xl font-semibold text-gray-800">
                        {user.firstname} {user.lastname}
                      </h4>
                      <p className="text-lg text-gray-600">
                        {user.role || "User"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h4 className="text-2xl font-semibold text-gray-700 mb-4">
                    Contact Information
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="w-32 font-medium text-gray-600">
                        Email:
                      </span>
                      <p className="text-gray-800">{user.email || "N/A"}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 font-medium text-gray-600">
                        Phone:
                      </span>
                      <p className="text-gray-800">
                        {user.phonenumber || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-600">
                Loading user information...
              </p>
            )}
          </section>
        )}


        {/* My Bookings Section */}
        {activeSection === "bookings" && (
          <section className="mb-12">

            {/* Upcoming Bookings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <h4 className="text-2xl font-semibold mb-4 col-span-full">Upcoming Bookings</h4>
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-gradient-to-r from-teal-500 via-teal-500 to-teal-500 p-6 rounded-lg shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">    {booking.eventId ? booking.eventId.eventName : "Event Name Not Available"}
                      </h4>
                      <p className="text-white mb-2">Date: {new Date(booking.eventDate).toLocaleDateString()}</p>
                      <p className="text-white">    Venue: {booking.venueId ? booking.venueId.location : "Venue Not Available"}
                      </p>
                    </div>
                    <div className="mt-4">
                      <span className="text-green-200 font-semibold">{booking.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No upcoming bookings found.</p>
              )}
            </div>

            {/* Past Bookings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <h4 className="text-2xl font-semibold mb-4 col-span-full">Past Bookings</h4>
              {pastBookings.length > 0 ? (
                pastBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-gradient-to-r from-orange-400 via-orange-400 to-orange-400 p-6 rounded-lg shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">    {booking.eventId ? booking.eventId.eventName : "Event Name Not Available"}
                      </h4>
                      <p className="text-white mb-2">Date: {new Date(booking.eventDate).toLocaleDateString()}</p>
                      <p className="text-white">    Venue: {booking.venueId ? booking.venueId.name : "Venue Not Available"}
                      </p>
                    </div>
                    <div className="mt-4">
                      <span className="text-red-200 font-semibold">{booking.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No past bookings found.</p>
              )}
            </div>
          </section>
        )}
        {/* Forgot Password Section */}
        {activeSection === "forgotPassword" && (
          <section
            id="forgot-password"
            className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg"
          >
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Reset Your Password
            </h3>

            {passwordMessage && (
              <div className="mb-4 text-center text-red-500">
                <p>{passwordMessage}</p>
              </div>
            )}

            <form onSubmit={handlePasswordUpdate}>
              <div className="space-y-4 mb-6">
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block font-medium text-gray-600"
                  >
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block font-medium text-gray-600"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block font-medium text-gray-600"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600"
              >
                Update Password
              </button>
            </form>
          </section>
        )}

      </main>
      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Dashboard;
