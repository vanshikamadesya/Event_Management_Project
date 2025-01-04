import React from 'react';
import birthdayImage from '../assets/birthday.jpg'; 
import partyImage from '../assets/party.jpg';
import weddingImage from '../assets/wedding.jpg';
import babyShower from '../assets/babyshower.jpg';
import anniversaryImage from '../assets/anniversary.webp';

const gallery = [
  {
    title: 'Birthday Parties',
    description: 'Celebrate in style with a personalized birthday event.',
    image: birthdayImage,
  },
  {
    title: 'Parties',
    description: 'Organize unforgettable parties with fun themes and vibes.',
    image: partyImage,
  },
  {
    title: 'Weddings',
    description: 'Make your big day even more special with our wedding services.',
    image: weddingImage,
  },
  {
    title: 'Anniversary',
    description: 'Celebrate love and togetherness with a memorable anniversary event.',
    image: anniversaryImage,
  },
  {
    title: 'Baby Shower',
    description: 'Celebrate the arrival of your little one with a joyous baby shower.',
    image: babyShower,
  },
];

const Services = () => {
  return (
    <div className="py-16 bg-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Our Gallery</h2>
        <p className="text-xl mt-4">We specialize in creating unforgettable events</p>
      </div>
      <div className="flex overflow-x-scroll gap-8 px-8">
        {gallery.map((item, index) => (
          <div key={index} className="relative w-80 flex-shrink-0 group">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-60 object-cover rounded-lg transition duration-300 ease-in-out transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center text-center text-white p-4 rounded-lg">
              <div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full mr-4 hover:bg-blue-700">
          ←
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700">
          →
        </button>
      </div>
    </div>
  );
};

export default Services;
