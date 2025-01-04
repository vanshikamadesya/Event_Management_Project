import React, { useEffect, useState } from "react";
import axios from "axios";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState("all"); // "all", "available", "not-available"
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingVenues, setLoadingVenues] = useState(true);
  const [errorEvents, setErrorEvents] = useState(null);
  const [errorVenues, setErrorVenues] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getAllEvent");
        setEvents(response.data);
        setLoadingEvents(false);
      } catch (error) {
        setErrorEvents("Error fetching events.");
        setLoadingEvents(false);
      }
    };

    const fetchVenues = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getAllVenue");
        setVenues(response.data);
        setFilteredVenues(response.data); // Initialize filteredVenues
        setLoadingVenues(false);
      } catch (error) {
        setErrorVenues("Error fetching venues.");
        setLoadingVenues(false);
      }
    };

    fetchEvents();
    fetchVenues();
  }, []);

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setAvailabilityFilter(filter);

    if (filter === "available") {
      setFilteredVenues(venues.filter((venue) => venue.availability));
    } else if (filter === "not-available") {
      setFilteredVenues(venues.filter((venue) => !venue.availability));
    } else {
      setFilteredVenues(venues); // Show all venues
    }
  };

  if (loadingEvents || loadingVenues) {
    return <p className="text-center text-gray-500">Loading data...</p>;
  }

  if (errorEvents || errorVenues) {
    return (
      <p className="text-center text-red-500">
        {errorEvents || errorVenues}
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-12">
      {/* Event Offerings Section */}
      <div>
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Our Event Offerings
        </h2>
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.eventName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {event.eventName}
                  </h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <p className="text-blue-700 font-semibold text-lg">
                    {event.eventPrice
                      ? `Starting at ₹${event.eventPrice.toLocaleString("en-IN")}`
                      : "Cost information not available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Venue Offerings Section */}
      <div>
        <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
          Our Venue Offerings
        </h2>

        {/* Filter Dropdown */}
        <div className="mb-6 flex justify-end">
          <label className="mr-2 text-gray-700 font-semibold">Filter by Availability:</label>
          <select
            value={availabilityFilter}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="not-available">Not Available</option>
          </select>
        </div>

        {filteredVenues.length === 0 ? (
          <p className="text-center text-gray-500">No venues available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <div
                key={venue._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={venue.image}
                  alt={venue.venueName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {venue.venueName}
                  </h3>
                  <p className="text-gray-600 mb-4">{venue.location}</p>
                  <p className="text-blue-700 font-semibold text-lg">
                    Capacity: {venue.capacity}
                  </p>
                  <p className="text-green-700 font-semibold text-lg">
                    ₹{venue.costPerHour.toLocaleString("en-IN")} per hour
                  </p>
                  <p
                    className={`font-bold ${
                      venue.availability ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {venue.availability ? "Available" : "Not Available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
