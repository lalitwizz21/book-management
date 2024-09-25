import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "../redux/thunks/bookThunks";

const BookForm = ({ currentBook, setCurrentBook, closeModal }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    coverImage: null,
    description: "",
  });

  useEffect(() => {
    console.log("currentBook is updated");
    if (currentBook) {
      setBookData({
        title: currentBook.title,
        author: currentBook.author,
        genre: currentBook.genre.join(", "),
        coverImage: null,
        description: currentBook.description,
      });
    }
  }, [currentBook]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "coverImage") {
      setBookData({ ...bookData, coverImage: files[0] });
    } else {
      setBookData({ ...bookData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    console.log("form submit", bookData);

    e.preventDefault();
    if (currentBook) {
      dispatch(updateBook({ id: currentBook._id, book: bookData }));
    } else {
      dispatch(addBook(bookData));
    }
    setBookData({
      title: "",
      author: "",
      genre: [],
      coverImage: null,
      description: "",
    });
    setCurrentBook(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={bookData.title}
        onChange={handleChange}
        className="border w-full p-2 mb-2"
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={bookData.author}
        onChange={handleChange}
        className="border w-full p-2 mb-2"
        required
      />
      <input
        type="text"
        name="genre"
        placeholder="Genre (comma separated)"
        value={bookData.genre}
        onChange={handleChange}
        className="border w-full p-2 mb-2"
        required
      />
      <input
        type="file"
        name="coverImage"
        ref={fileInputRef}
        onChange={handleChange}
        className="border w-full p-2 mb-2"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={bookData.description}
        onChange={handleChange}
        className="border w-full p-2 mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2"
      >
        {currentBook ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;
