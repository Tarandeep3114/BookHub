import React from 'react';
import { FaBook, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="w-full bg-black text-gray-400 py-8 shadow-inner"
      style={{
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px -50px 100px -20px, rgba(0, 0, 0, 0.3) 0px -30px 60px -30px, rgba(10, 37, 64, 0.35) 0px 2px 6px 0px inset',
      }}
    >
      <div className="max-w-[80%] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 text-white text-2xl font-bold">
            <FaBook />
            <span>BookHub</span>
          </div>

          {/* Links Section */}
          <div className="flex space-x-6">
          &copy; {new Date().getFullYear()} BookHub. All Rights Reserved.
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition duration-200"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition duration-200"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition duration-200"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

      
      </div>
    </footer>
  );
};

export default Footer;
