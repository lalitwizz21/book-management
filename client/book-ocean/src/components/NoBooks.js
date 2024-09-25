import React from "react";

const NoBooks = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          No Books Available
        </h2>
        <p className="text-gray-600 mb-6">
          It looks like you don't have any books in your library. Please click
          the "Add Book" button above to create your first book!
        </p>
      </div>
    </div>
  );
};

export default NoBooks;
