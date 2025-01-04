import React from 'react';

// Import static images
import invitationImg from '../assets/i.jpeg';
import photoVideoImg from '../assets/photo_video.jpg';
import beautyMakeupImg from '../assets/baeuty_makeup.jpeg';
import weddingFlowersImg from '../assets/wedding-flower.jpeg';
import weddingCakeImg from '../assets/cake.jpeg';
import musicBandImg from '../assets/music_bandjpeg.jpeg';
import cateringImg from '../assets/cateringjpeg.jpeg';
import venuesImg from '../assets/venuejpeg.jpeg';

const services = [
  { title: 'Invitation', tagline: 'Elegant Invitations for Every Event', image: invitationImg },
  { title: 'Photo & Video', tagline: 'Capturing Moments to Remember', image: photoVideoImg },
  { title: 'Beauty & Makeup', tagline: 'Look Your Best on the Big Day', image: beautyMakeupImg },
  { title: 'Flowers', tagline: 'Beautiful Bouquets & Floral Arrangements', image: weddingFlowersImg },
  { title: 'Cake', tagline: 'Delicious Cakes for Every Occasion', image: weddingCakeImg },
  { title: 'Music Band', tagline: 'Live Music to Set the Mood', image: musicBandImg },
  { title: 'Catering', tagline: 'Delectable Menus for All Tastes', image: cateringImg },
  { title: 'Venues', tagline: 'Stunning Locations for Your Event', image: venuesImg },
];

const Services = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-white via-pink-50 to-yellow-50">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold text-gray-800 tracking-wide">Our Services</h2>
        <p className="text-lg mt-4 text-gray-600">
          Tailored solutions for your events, making every moment unforgettable.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            {/* Service Image */}
            <div className="h-40 w-full">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Service Content */}
            <div className="p-6 text-center bg-gradient-to-br from-yellow-50 to-white">
              <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
              <p className="mt-2 text-gray-600">{service.tagline}</p>
            </div>

            {/* Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-0 hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
              <h3 className="text-xl text-white font-semibold tracking-wide">
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
