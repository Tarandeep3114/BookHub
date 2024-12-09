import React, { useState } from 'react';
import BookForm from './BookForm';
import BooksList from './BooksList';

const Dashboard = () => {
  const [booksUpdated, setBooksUpdated] = useState(false);

  const handleBookAdded = () => {
    setBooksUpdated((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen p-3">
      <div className="container mx-auto p-4">


        {/* Responsive Layout for Form and Books List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Book Form */}
          <div className="lg:col-span-1 ">

            <BookForm onBookAdded={handleBookAdded} />
          </div>

          {/* Books List */}
          <div className="lg:col-span-2">
            <BooksList booksUpdated={booksUpdated} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
