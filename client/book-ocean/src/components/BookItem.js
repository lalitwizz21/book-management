import React from "react";

const BookItem = ({ book, onDelete, onUpdate }) => {
  return (
    <div className="p-4 rounded-lg shadow-md p-4 hover:shadow-2xl transition-shadow duration-300 ">
      <div className="overflow-hidden bg-black relative rounded">
        <img
          src={process.env.REACT_APP_API_URL + book.coverImage}
          alt={book.title}
          className="w-full h-48 object-contain rounded hover:scale-125 transition-all ease-linear"
        />

        <div className="flex w-full justify-between absolute top-1">
          <button
            onClick={onUpdate}
            className="bg-green-500 text-white rounded p-2 ml-1"
          >
            <svg
              fill="#fff"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4h6a1,1,0,0,0,0-2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM6,12.76V17a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.71-.29l6.92-6.93h0L21.71,8a1,1,0,0,0,0-1.42L17.47,2.29a1,1,0,0,0-1.42,0L13.23,5.12h0L6.29,12.05A1,1,0,0,0,6,12.76ZM16.76,4.41l2.83,2.83L18.17,8.66,15.34,5.83ZM8,13.17l5.93-5.93,2.83,2.83L10.83,16H8Z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white rounded p-2 mr-1"
          >
            <svg
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 52 52"
              enable-background="new 0 0 52 52"
            >
              <g>
                <path
                  d="M45.5,10H33V6c0-2.2-1.8-4-4-4h-6c-2.2,0-4,1.8-4,4v4H6.5C5.7,10,5,10.7,5,11.5v3C5,15.3,5.7,16,6.5,16h39
		c0.8,0,1.5-0.7,1.5-1.5v-3C47,10.7,46.3,10,45.5,10z M23,7c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1v3h-6V7z"
                />
                <path
                  d="M41.5,20h-31C9.7,20,9,20.7,9,21.5V45c0,2.8,2.2,5,5,5h24c2.8,0,5-2.2,5-5V21.5C43,20.7,42.3,20,41.5,20z
		 M23,42c0,0.6-0.4,1-1,1h-2c-0.6,0-1-0.4-1-1V28c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1V42z M33,42c0,0.6-0.4,1-1,1h-2
		c-0.6,0-1-0.4-1-1V28c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1V42z"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>

      <h3 className="text-lg md:text-xl font-bold capitalize mb-1 truncate ">
        {book.title}
      </h3>
      <p className="text-sm font-semibold mb-1 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        {book.author}
      </p>
      <p className="text-sm text-gray-600 mb-1">{book.genre.join(", ")}</p>
      {book.description && (
        <p className="text-sm text-gray-500">{book.description}</p>
      )}
    </div>
  );
};

export default BookItem;
