import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from "./AdminLayout";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getAllBooking');
        // Access the bookings array from response.data.bookings
        setBookings(response.data.bookings || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <AdminLayout>
      <div>
        <h3 className="text-xl font-semibold mb-4">View Bookings</h3>
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="p-2 border">Event Type</th>
              <th className="p-2 border">Event Date</th>
              <th className="p-2 border">Total Guests</th>
              <th className="p-2 border">Booking Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="p-2 border">
                  {/* Check if eventId exists and has eventName */}
                  {booking.eventId && booking.eventId.eventName ? booking.eventId.eventName : 'Event not found'}
                </td>
                <td className="p-2 border">{new Date(booking.eventDate).toLocaleDateString()}</td>
                <td className="p-2 border">{booking.totalGuest}</td>
                <td className="p-2 border">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ViewBookings;
