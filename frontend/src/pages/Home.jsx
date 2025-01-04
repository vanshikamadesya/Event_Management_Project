import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/home2.webp'; 
import Gallery from './Gallery';  // Import the Gallery component

const Home = () => {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <div
        className="h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay Box with Centered Content */}
        {/* <div className="absolute inset-0 flex items-center justify-center"> */}
          {/* <div className="bg-white bg-opacity-100 p-8 rounded-lg text-center text-black max-w-lg"> */}
            {/* <h3 className="text-4xl font-bold mb-4">Occasia</h3>
            <h1 className="text-2xl mb-6">"Creating Unforgettable Moments with Every Event"</h1>
            <p className="text-lg mb-8"></p> */}

            {/* Contact Button */}
            {/* <Link
              to="/contact"
              className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              BOOK NOW
            </Link>
          </div> */}
        {/* </div> */}
      </div>

      {/* Gallery Section */}
      <Gallery />
    </div>
  );
};

export default Home;
