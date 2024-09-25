import React, { useState, useEffect } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [currentBook, setCurrentBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentBook(null); // Clear the form when modal closes
  };

  useEffect(() => {
    if (currentBook) {
      console.log("opening modal");

      handleOpenModal();
    }
  }, [currentBook]);

  return (
    <div className=" mx-auto p-4 bg-custom-gradient h-screen">
      <h1 className="text-center mb-5 text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        Book Ocean
      </h1>

      {/* Button to open the modal for adding/updating a book */}
      <div className="container mx-auto flex justify-center mb-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 "
          onClick={handleOpenModal}
        >
          Add Book
        </button>
      </div>

      {/* Modal for BookForm */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <button
              className="text-red-500 float-right text-xl font-bold"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <BookForm
              currentBook={currentBook}
              setCurrentBook={setCurrentBook}
              closeModal={handleCloseModal}
            />
          </div>
        </div>
      )}

      <BookList setCurrentBook={setCurrentBook} />

      <ToastContainer
        hideProgressBar={false} // Show or hide progress bar
        newestOnTop={false}
        closeOnClick
        theme="dark"
      />
    </div>
  );
};

export default App;
