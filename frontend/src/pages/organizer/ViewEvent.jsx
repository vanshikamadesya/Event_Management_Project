import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrganizerDashboard from "./OrganizerDashboard";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getAllEvent"
        );
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching events.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/deleteEvent/${eventId}`);
      toast.success("Event deleted successfully!");
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete event.");
    }
  };

  const handleExpand = (event) => {
    if (expandedEventId === event._id) {
      setExpandedEventId(null);
    } else {
      setExpandedEventId(event._id);
      setFormData({ ...event });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (eventId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/updateEvent/${eventId}`,
        formData
      );
      toast.success("Event updated successfully!");

      setEvents(
        events.map((event) =>
          event._id === eventId ? { ...event, ...formData } : event
        )
      );

      setExpandedEventId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update event.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading events...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <OrganizerDashboard>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          View Events
        </h1>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events available.</p>
        ) : (
          <table className="table-auto w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Event Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <React.Fragment key={event._id}>
                  <tr>
                    <td className="border px-4 py-2">
                      <img
                        src={event.image}
                        alt={event.eventName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="border px-4 py-2">{event.eventName}</td>
                    <td className="border px-4 py-2">{event.description}</td>
                    <td className="border px-4 py-2">
                      {event.eventPrice
                        ? `₹${event.eventPrice.toLocaleString("en-IN")}`
                        : "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleExpand(event)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        >
                          {expandedEventId === event._id ? "Cancel" : "Update"}
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedEventId === event._id && (
                    <tr>
                      <td colSpan="5" className="p-4 bg-gray-50">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate(event._id);
                          }}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block mb-1">Event Name</label>
                              <input
                                type="text"
                                name="eventName"
                                value={formData.eventName || ""}
                                onChange={handleFormChange}
                                className="border p-2 w-full"
                                required
                              />
                            </div>
                            <div>
                              <label className="block mb-1">Description</label>
                              <textarea
                                name="description"
                                value={formData.description || ""}
                                onChange={handleFormChange}
                                className="border p-2 w-full"
                                required
                              ></textarea>
                            </div>
                            <div>
                              <label className="block mb-1">Event Price</label>
                              <input
                                type="number"
                                name="eventPrice"
                                value={formData.eventPrice || ""}
                                onChange={handleFormChange}
                                className="border p-2 w-full"
                                required
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <button
                              type="submit"
                              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setExpandedEventId(null)}
                              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}

        {/* Toast Notifications */}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </OrganizerDashboard>
  );
};

export default ViewEvents;
