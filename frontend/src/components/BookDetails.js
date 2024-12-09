import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaTrashAlt, FaCalendarAlt, FaUserAlt } from 'react-icons/fa';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete modal state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:7000/books/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          setBook(data);
          setTitle(data.title);
          setAuthor(data.author);
          setDescription(data.description);
          setPublicationDate(data.publicationDate);
          setCoverImage(data.coverImage);
        } else {
          alert('Error fetching book details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBook();
  }, [id, authToken]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:7000/books/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        alert('Error deleting book');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleSaveChanges = async () => {
    try {
      console.log('Updating book with ID:', id); // Debugging ID
      const response = await fetch(`http://localhost:7000/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title, author, description, publicationDate, coverImage }),
      });

      if (response.ok) {
        const updatedBook = await response.json();
        console.log('Updated book:', updatedBook); // Debugging response
        setBook(updatedBook); // Update the state
        setIsEditing(false); // Close the modal
      } else {
        const errorText = await response.text();
        console.error('Error updating book:', errorText); // Log server error
        alert('Error updating book. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the book.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-screen flex items-center -mt-8">
      {book ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Book Image Section */}
            <div className="flex justify-center items-center">
              <img
                src={coverImage || 'https://via.placeholder.com/300'}
                alt="Book Cover"
                className="w-full max-w-sm rounded-lg shadow-md"
              />
            </div>

            {/* Book Details Section */}
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-4">{title}</h1>
              <div className="space-y-3">
                <p className="flex items-center text-gray-600">
                  <FaUserAlt className="mr-2 text-gray-500" />
                  <span className="font-semibold">Author:</span> {author}
                </p>
                <p className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  <span className="font-semibold">Publication Date:</span> {publicationDate}
                </p>
                <p className="text-gray-600 text-md">
                  <span className="font-semibold">Description:</span> {description}
                </p>
              </div>

              {/* Action Buttons */}
              {authToken && (
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-gray-900 transition duration-200"
                  >
                    <FaEdit className="mr-2" /> Edit Book
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition duration-200"
                  >
                    <FaTrashAlt className="mr-2" /> Delete Book
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Editing Modal */}
          {isEditing && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Edit Book Details</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Book Title"
                  />
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Author"
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Description"
                  />
                  <input
                    type="date"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Cover Image URL"
                  />
                </div>
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={handleSaveChanges}
                    className="bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Confirm Delete</h2>
                <p className="text-gray-600">
                  Are you sure you want to delete this book? This action cannot be undone.
                </p>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="bg-gray-950 text-white py-2 px-4 rounded-md hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default BookDetails;
