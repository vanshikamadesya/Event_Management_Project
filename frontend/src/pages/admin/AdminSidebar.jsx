import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle, FaCalendarPlus, FaUserTie,FaCalendarAlt, FaMapMarkerAlt,FaEye } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";

const AdminSidebar = () => {
  
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen mb-2">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-6 border-b border-gray-700">
        <FaUserCircle size={50} className="text-gray-400" />
        <h2 className="mt-2 text-lg font-semibold">Admin</h2>
        {/* <p className="text-sm text-gray-400">admin@example.com</p> */}
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        <ul>
        <li>
            <NavLink
              to="/admin"
              className="flex items-center p-2 hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              <MdDashboard className="mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/add-event"
              className="flex items-center p-2 hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              <FaCalendarPlus className="mr-3" />
              Add Event
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/view-event"
              className="flex items-center p-2 hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              <FaEye className="mr-3" />
              View Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/add-vendor"
              className="flex items-center p-2 hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              <FaUserTie className="mr-3" />
              Add Vendor
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/add-venue"
              className="flex items-center p-2 hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              <FaMapMarkerAlt className="mr-3" />
              Add Venue
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/view-venue"
              className="flex items-center p-2 hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              <FaEye className="mr-3" />
              View Venues
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/view-booking"
              className="flex items-center p-2 hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              <FaCalendarAlt className="mr-3" />
              View Bookings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
