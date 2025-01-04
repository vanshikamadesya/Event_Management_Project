import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaCalendarCheck, FaLock, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const OrganizerDashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeSection, setActiveSection] = useState("profile");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

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
          })
          .catch((err) => console.error("Error fetching user details:", err));
      } else {
        console.error("User ID is missing.");
      }
    }
  }, []);

  // Fetch all bookings
  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getAllBooking"
        );
        if (response.data.success) {
          setBookings(response.data.bookings); // Assuming `bookings` contains all bookings
        } else {
          console.error("No bookings found.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchAllBookings();
  }, []);

  // Handle status change  in booking
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/updateStatus/${bookingId}`,
        {
          bookingId,
          status: newStatus,
        }
      );

      if (response.data.success) {
        // Update the status locally to reflect the change without re-fetching
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );
      } else {
        console.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
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

  return (
    <div className="flex h-screen p-0">
      {/* Sidebar */}
      <aside className="w-1/6 bg-gray-800 text-white p-6 mb-1">
        <div className="flex flex-col items-center py-6 border-b border-gray-700">
          <FaUserCircle size={50} className="text-gray-400" />
          <h2 className="mt-2 text-lg font-semibold">Organizer</h2>
        </div>
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
                <FaCalendarCheck className="mr-2 text-lg" /> View Bookings
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
        {/* Logout Button */}
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800"></div>

          <div>
            <button
              onClick={logout}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>

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
            <h4 className="text-2xl font-semibold mb-4">All Bookings</h4>
            <table className="min-w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-left font-medium text-gray-700">
                    Event Name
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-gray-700">
                    Date
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-gray-700">
                    Venue
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="border-t">
                      <td className="py-2 px-4">
                        {booking.eventId?.eventName || "N/A"}
                      </td>
                      <td className="py-2 px-4">
                        {new Date(booking.eventDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">
                        {booking.venueId?.location || "N/A"}
                      </td>
                      <td className="py-2 px-4">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            handleStatusChange(booking._id, e.target.value)
                          }
                          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending">Pending</option>
                          <option value="Canceled">Canceled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-2 px-4 text-center text-gray-500"
                    >
                      No bookings available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
      <ToastContainer />
    </div>
  );
};

export default OrganizerDashboard;
