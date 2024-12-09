import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
      <Link
        to="/"
        className="bg-gray-950 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
