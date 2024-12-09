import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaTrashAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [bookToDelete, setBookToDelete] = useState(null); // Book to delete
  const booksPerPage = 9;
  const { authToken } = useAuth();

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:7000/books', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        const data = await response.json();
        // Sort books by publishDate in descending order
        const sortedData = data.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
        setBooks(sortedData);
      } else {
        console.error('Error fetching books');
      }
    } catch (error) {
      console.error('Fetch books error:', error);
    }
  };


  const confirmDelete = (id) => {
    setBookToDelete(id); // Set the book to be deleted
    setShowModal(true); // Show the modal
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:7000/books/${bookToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        setBooks(books.filter((book) => book.id !== bookToDelete));
        setShowModal(false); // Close the modal
      } else {
        alert('Error deleting book');
      }
    } catch (error) {
      console.error('Delete book error:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.publicationDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.description.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (authToken) fetchBooks();
  }, [authToken]);

  return (
    <div className="max-w-6xl mx-auto mt-2 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center"> All Books</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search books by title, author, description, or keyword..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full border border-gray-300 rounded-lg p-3 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredBooks.length > 0 ? (
          currentBooks.map((book) => (
            <div
              key={book.id}
              style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset" }} className="bg-white w-full h-auto p-4 rounded-lg shadow-md overflow-hidden hover:scale-105 hover:duration-150"
            >
              <div className="relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-25 transition-opacity duration-300 rounded-t-lg"></div>
              </div>
              <div className="p-4">
                <h3 className="text-xl text-black font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {book.description.slice(0, 100)}...
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/book/${book.id}`}
                  className="bg-gray-950 text-white py-2 px-8 rounded flex items-center space-x-2 hover:bg-gray-800 transition-colors duration-200"
                >
                  <FaEye /> <span>View</span>
                </Link>
                <button
                  onClick={() => confirmDelete(book.id)}

                  className="bg-red-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-red-600 transition-colors duration-200"
                >
                  <FaTrashAlt /> <span>Delete</span>
                </button>
              </div>
            </div>
          ))) : (
          <div className="flex mt-10 min-h-[300px]">
            <p className="text-gray-600 text-xl font-semibold">No books found</p>
          </div>

        )}
      </div>


      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${currentPage === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-950 text-white hover:bg-blue-600'
              }`}
          >
            <FaArrowLeft />
            <span>Previous</span>
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-full ${currentPage === index + 1
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${currentPage === totalPages
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-950 text-white hover:bg-blue-600'
              }`}
          >
            <span>Next</span>
            <FaArrowRight />
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-lg font-bold text-gray-800">Confirm Deletion</h2>
            <p className="text-sm text-gray-600 mt-4">
              Are you sure you want to delete this book? This action cannot be undone.
            </p>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksList;
