import React from "react";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  return (
    <div className="flex justify-between items-center mt-4 mb-4">
      <div className="text-xl font-bold text-gray-800"></div>

      <div>
        <button
          onClick={logout}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 mr-5"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
