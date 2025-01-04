import React from 'react';
import aboutImage from '../assets/about.jpg';

const AboutUs = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-white via-cream-50 to-light-yellow-50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-8">
        {/* Left side (Content) */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-4 border-b-4 border-yellow-300 inline-block">
            About Us
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We are passionate event planners dedicated to creating unforgettable experiences. From intimate gatherings to grand celebrations, we meticulously craft every detail to bring your vision to life.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our seasoned team ensures each event is a seamless blend of creativity and precision. With a commitment to excellence, we tailor our services to suit your unique needs and preferences.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Let us turn your special moments into cherished memories. Trust us to make every occasion extraordinary.
          </p>
        </div>

        {/* Right side (Image) */}
        <div className="relative">
          <img
            src={aboutImage}
            alt="About Us"
            className="w-full h-auto object-cover rounded-lg shadow-xl"
          />
          <div className="absolute top-4 left-4 bg-yellow-100 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              "Crafting memories, one event at a time."
            </h3>
          </div>
        </div>
      </div>

      {/* Mission/Values Section */}
      <div className="mt-16 bg-yellow-50 py-12">
        <div className="container mx-auto text-center px-6">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Our Mission
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Occasia, our mission is to transform your ideas into reality and create moments that resonate with joy and elegance. With attention to detail and a commitment to excellence, we ensure every event reflects your style and exceeds your expectations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
