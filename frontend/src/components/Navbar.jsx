import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth(); // Get auth state and logout function

  return (
    <div className="bg-white bg-opacity-80 text-black p-6 shadow-md sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="text-3xl font-serif font-bold text-pink-600 tracking-wider">
          <NavLink to="/" className="hover:text-pink-400 transition-colors duration-300">
            Occasia
          </NavLink>
        </div>

        {/* Right side - Navigation links */}
        <div className="flex items-center space-x-8">
          <ul className="flex space-x-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-500 font-semibold'
                    : 'hover:text-gray-600 transition-colors duration-300'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-500 font-semibold'
                    : 'hover:text-gray-600 transition-colors duration-300'
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-500 font-semibold'
                    : 'hover:text-gray-600 transition-colors duration-300'
                }
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-500 font-semibold'
                    : 'hover:text-gray-600 transition-colors duration-300'
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/eventPage"
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-500 font-semibold'
                    : 'hover:text-gray-600 transition-colors duration-300'
                }
              >
                Events
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/book-event"
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-500 font-semibold'
                    : 'hover:text-gray-600 transition-colors duration-300'
                }
              >
                Book Event
              </NavLink>
            </li>

            {/* Show Login link if not logged in */}
            {!isLoggedIn ? (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-yellow-500 font-semibold'
                      : 'hover:text-gray-600 transition-colors duration-300'
                  }
                >
                  Login
                </NavLink>
              </li>
            ) : (
              // Show Account and Logout if logged in
              <>
                <li>
                  <button
                    onClick={logout} // Logout handler
                    className="hover:text-gray-600 text-gray-800 font-semibold transition-colors duration-300"
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <NavLink
                    to="/my-profile"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-yellow-500'
                        : 'hover:text-gray-600 transition-colors duration-300'
                    }
                  >
                    <FaUserCircle fontSize={28} className="transition-transform transform hover:scale-110" />
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
