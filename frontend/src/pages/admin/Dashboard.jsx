import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({});
  const [pieData, setPieData] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total bookings and users from your API
        const bookingsResponse = await axios.get(
          "http://localhost:3000/api/getBookingCount"
        );
        const usersResponse = await axios.get(
          "http://localhost:3000/api/auth/getAllUser"
        );

        // Set state for total bookings and users
        setTotalBookings(bookingsResponse.data.totalBookings);
        setTotalUsers(usersResponse.data.totalUsers);

        // Bar chart data
        setChartData({
          labels: ["Jan", "Feb", "Mar", "Apr", "May"], // Static month labels
          datasets: [
            {
              label: "Bookings Overview",
              data: [5, 10, 15, 20, 25], // Static booking data for the bar chart
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });

        // Pie chart data (for example, user distribution by type)
        setPieData({
          labels: ["Admin", "Customer", "Organizer"], // Static categories
          datasets: [
            {
              label: "User Distribution",
              data: [30, 50, 30], // Static user distribution data
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
              ],
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error(err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <AdminLayout>
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {/* Overview Section with Enhanced Card Styling */}
        <section
          id="overview"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Total Bookings Card */}
          <div className="bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
            <h3 className="text-xl font-semibold">Total Bookings</h3>
            <p className="text-4xl font-bold">{totalBookings}</p>
          </div>

          {/* Total Users Card */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-4xl font-bold">{totalUsers}</p>
          </div>
        </section>

        {/* Analytics Section with Side-by-Side Charts */}
        <section id="analytics" className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Analytics</h3>

          <div className="flex gap-6 h-80">
            {/* Bar Chart for Bookings */}
            <div className="bg-white shadow-md p-4 h-80 rounded w-full sm:w-1/2">
              <h4 className="text-xl font-semibold mb-4">Bookings Overview</h4>
              <Bar data={chartData} />
            </div>

            {/* Pie Chart for User Distribution */}
            <div className="bg-white shadow-md p-4 w-full sm:w-1/2 flex justify-center items-center">
            <h4 className="text-xl h-0  font-semibold mb-40">User Distribution</h4>
 
              <div className="w-3/4 h-3/4">
                {" "}
                {/* Control the size of the pie chart */}
                <Pie data={pieData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </AdminLayout>
  );
};

export default Dashboard;
