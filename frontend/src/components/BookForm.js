import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaBook, FaUser, FaRegFileAlt, FaCalendarAlt, FaImage } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const { authToken } = useAuth();

  const validateForm = () => {
    if (!title) {
      toast.error('Title is required');
      return false;
    }
    if (!author) {
      toast.error('Author is required');
      return false;
    }
    if (!description) {
      toast.error('Description is required');
      return false;
    }
    if (!publicationDate) {
      toast.error('Publication date is required');
      return false;
    }
    if (!coverImage || !coverImage.startsWith('http')) {
      toast.error('Valid Cover Image URL is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:7000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title, author, description, publicationDate, coverImage }),
      });

      if (response.ok) {
        const newBook = await response.json();
        onBookAdded(newBook);
        setTitle('');
        setAuthor('');
        setDescription('');
        setPublicationDate('');
        setCoverImage('');
        toast.success('Book added successfully');
        window.location.reload(); // Reload the page to reinitialize the app state
      } else {
        toast.error('Failed to add book');
      }
    } catch (error) {
      console.error('Add book error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        style={{
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
        }}
        className="bg-white w-full h-auto p-8 shadow-lg rounded-xl my-8 space-y-6 transition-all duration-300"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add a <span className='font-bold'>New Book</span></h2>

        {/* Title Input */}
        <div className="relative">
          <FaBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
          <input
            type="text"
            placeholder="Book Title"
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-black focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Author Input */}
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
          <input
            type="text"
            placeholder="Author"
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-black focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {/* Description Input */}
        <div className="relative">
          <FaRegFileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
          <textarea
            placeholder="Description"
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-black focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Publication Date Input */}
        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
          <input
            type="date"
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-black focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </div>

        {/* Cover Image URL Input */}
        <div className="relative">
          <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
          <input
            type="url"
            placeholder="Cover Image URL"
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-black focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg text-lg font-semibold bg-black text-white hover:bg-gray-900 transition-colors duration-300"
        >
          Add Book
        </button>
      </form>
    </>
  );
};

export default BookForm;
