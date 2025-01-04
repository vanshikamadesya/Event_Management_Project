import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column (Logo & About Us) */}
          <div>
            <h2 className="text-3xl font-bold text-blue-400 mb-4">Occasia</h2>
            <p className="text-lg">
              Creating unforgettable moments for your special occasions. We are here to plan and organize your dream events.
            </p>
          </div>

          {/* Middle Column (Quick Links) */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Right Column (Contact Info & Social Media) */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">Email: contact@occasia.com</p>
            <p className="text-gray-400 mb-2">Phone: +1 234 567 890</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-900 text-center py-4 mt-8">
        <p className="text-gray-500 text-sm">© 2024 Occasia. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
