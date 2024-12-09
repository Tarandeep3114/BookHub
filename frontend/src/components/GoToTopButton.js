import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Importing the icon

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gray-950 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 ease-in-out"
          style={{
            boxShadow:
              '0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </>
  );
};

export default GoToTopButton;
