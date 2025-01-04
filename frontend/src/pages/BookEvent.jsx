import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        userId: user.userId, // Use the logged-in user's ID
      }));
    }
  }, [user]);

  const [formData, setFormData] = useState({
    eventDate: "",
    totalGuest: "",
    status: "Pending",
    paymentStatus: "Pending",
    userId: "",
    eventId: "",
    venueId: "",
    services: [],
  });

  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getAllEvent")
      .then((response) => {
        console.log(response); // Log the response to see its structure

      if (response.data && Array.isArray(response.data)) {
        setEvents(response.data);  // Safely set events
      } else {
        setError("Invalid response format for events.");
      }
    })
      
      .catch((error) => {
        setError("Failed to fetch events.");
        console.error("Error fetching events:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getAllVenue")
      .then((response) => {
        
        if (response.data && Array.isArray(response.data)) {
          setVenues(response.data);  // Safely set venues
        } else {
          setError("Invalid response format for venues.");
        }
        })
      .catch((error) => {
        console.error("Error fetching venues:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const services = checked
        ? [...prevData.services, value]
        : prevData.services.filter((service) => service !== value);
      return { ...prevData, services };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { eventDate, totalGuest, services, userId, eventId, venueId } = formData;
    const payload = { eventDate, totalGuest, services, userId, eventId, venueId };

    try {
      const response = await axios.post("http://localhost:3000/api/bookEvent", payload);

      const bookingId = response.data?.bookingId;

      if (bookingId) {
        setSuccessMessage("Booking confirmed successfully!");
        setError(null);
        navigate(`/orders/${bookingId}`);
      } else {
        throw new Error("Booking ID not received from server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred, please try again.");
    }
  };
  const exchangeRate = 82; 

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center py-10">
      <div className="max-w-3xl w-full bg-white p-10 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-light text-center text-gray-800 mb-6">Book Your Event</h1>

        {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Event</label>
            <select
              name="eventId"
              value={formData.eventId}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select an Event</option>
              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.eventName}
                </option>
              ))}
            </select>
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Total Guest */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">No. of Guests</label>
            <input
              type="number"
              name="totalGuest"
              value={formData.totalGuest}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Venue Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Venue</label>
            <select
              name="venueId"
              value={formData.venueId}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>Select a Venue</option>
              {venues.length > 0 ? (
                venues.map((venue) => (
                  <option key={venue._id} value={venue._id}>
                    {venue.venueName} - ₹{venue.costPerHour}
                  </option>
                ))
              ) : (
                <option value="" disabled>No venues available</option>
              )}
            </select>
          </div>

          {/* Service Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Services</label>
            <div className="space-y-3">
              {["Invitation", "Catering", "Photography", "Music Band", "Flower", "Cake"].map((service) => (
                <label key={service} className="flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    value={service}
                    onChange={handleServiceChange}
                    className="mr-3 h-4 w-4 text-blue-500 focus:ring-2 focus:ring-blue-400"
                  />
                  {service}
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
