import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBook } from 'react-icons/fa'; // Importing book icon

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('authToken')); // Ensure consistency with the key used in AuthProvider

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('authToken')); // Consistent key
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Consistent key
    setToken(null);
    navigate('/');
    window.location.reload(); // Reload the page to reinitialize the app state
  };

  return (
    <nav
      style={{
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
      }}
      className="w-full h-auto bg-black sticky top-0 z-50 p-4 overflow-hidden"
    >
      <div className="max-w-[90%] mx-auto flex justify-between items-center">
        {/* Logo with Book Icon */}
        <Link to="/" className="text-white text-3xl font-bold flex items-center space-x-2">
          <FaBook />
          <span>BookHub</span>
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4 text-md">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-gray-300 transition duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-white hover:text-gray-300 transition duration-200"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="text-white hover:text-gray-300 transition duration-200"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
