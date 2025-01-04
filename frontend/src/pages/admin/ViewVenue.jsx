import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./AdminLayout";

const ViewVenue = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedVenueId, setExpandedVenueId] = useState(null); // Track expanded venue
  const [formData, setFormData] = useState({}); // Store form data for editing

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getAllVenue"
        );
        setVenues(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching venues.");
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleDelete = async (venueId) => {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/deleteVenue/${venueId}`);
      toast.success("Venue deleted successfully!");
      setVenues(venues.filter((venue) => venue._id !== venueId)); // Remove from UI
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete venue.");
    }
  };

  const handleExpand = (venue) => {
    if (expandedVenueId === venue._id) {
      setExpandedVenueId(null); // Collapse the form
    } else {
      setExpandedVenueId(venue._id); // Expand the form for this venue
      setFormData({ ...venue }); // Populate the form with current venue data
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "availability" ? value === "true" : value, // Convert availability to boolean
    });
  };

  const handleUpdate = async (venueId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/updateVenue/${venueId}`,
        formData
      );
      toast.success("Venue updated successfully!");

      // Update the venue in the UI
      setVenues(
        venues.map((venue) =>
          venue._id === venueId ? { ...venue, ...formData } : venue
        )
      );

      setExpandedVenueId(null); // Collapse the form after saving
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update venue.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading venues...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
      View Venues
        </h1>

        {venues.length === 0 ? (
          <p className="text-center text-gray-500">No venues available.</p>
        ) : (
          <table className="table-auto w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Venue Name</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Capacity</th>
                <th className="px-4 py-2">Cost Per Hour</th>
                <th className="px-4 py-2">Availability</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue) => (
                <React.Fragment key={venue._id}>
                  <tr>
                    <td className="border px-4 py-2">{venue.venueName}</td>
                    <td className="border px-4 py-2">{venue.location}</td>
                    <td className="border px-4 py-2">{venue.capacity}</td>
                    <td className="border px-4 py-2">{`₹${venue.costPerHour.toLocaleString(
                      "en-IN"
                    )}`}</td>
                    <td className="border px-4 py-2">
                      {venue.availability ? (
                        <span className="text-green-600">Available</span>
                      ) : (
                        <span className="text-red-600">Not Available</span>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleExpand(venue)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                      >
                        {expandedVenueId === venue._id ? "Cancel" : "Update"}
                      </button>
                      <button
                        onClick={() => handleDelete(venue._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                  {/* Expanded form for updating venue */}
                  {expandedVenueId === venue._id && (
                    <tr>
                      <td colSpan="6" className="border px-4 py-2">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate(venue._id);
                          }}
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block mb-1">Venue Name</label>
                              <input
                                type="text"
                                name="venueName"
                                value={formData.venueName || ""}
                                onChange={handleFormChange}
                                className="border p-2 w-full"
                                required
                              />
                            </div>
                            <div>
                              <label className="block mb-1">Location</label>
                              <textarea
                                name="location"
                                value={formData.location || ""}
                                onChange={handleFormChange}
                                className="border p-2 w-full"
                                required
                              ></textarea>
                            </div>
                            <div>
                              <label className="block mb-1">Capacity</label>
                              <input
                                type="number"
                                name="capacity"
                                value={formData.capacity || ""}
                                onChange={handleFormChange}
                                className="border p-2 w-full"
                                required
                              />
                            </div>
                            <div>
                              <label className="block mb-1">
                                Cost Per Hour
                              </label>
                              <input
                                type="number"
                                name="costPerHour"
                                value={formData.costPerHour || ""}
                                onChange={handleFormChange}
                                className="border p-2 w-full"
                                required
                              />
                            </div>
                            <div>
                              <label className="block mb-1">Availability</label>
                              <select
                                name="availability"
                                value={formData.availability}
                                onChange={handleFormChange}
                                className="border p-2 w-full"
                                required
                              >
                                <option value={true}>Available</option>
                                <option value={false}>Not Available</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <button
                              type="submit"
                              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setExpandedVenueId(null)}
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
    </AdminLayout>
  );
};

export default ViewVenue;
