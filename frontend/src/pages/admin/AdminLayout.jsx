import React from 'react';
import Sidebar from "./AdminSidebar";
import Header from "./AdminHeader"

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Dynamic Content */}
        <div className="p-6 bg-gray-100 flex-1">{children}</div>
      </div>
    </div>
  );
};


export default AdminLayout;
