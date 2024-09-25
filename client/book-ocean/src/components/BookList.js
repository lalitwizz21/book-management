import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../redux/thunks/bookThunks";
import BookItem from "./BookItem";
import NoBooks from "./NoBooks";

const BookList = ({ setCurrentBook }) => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.books);
  console.log("list", books);

  useEffect(() => {
    console.log("dispatch", dispatch);

    dispatch(fetchBooks());
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      {books?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books?.map((book) => (
            <BookItem
              key={book._id}
              book={book}
              onDelete={() => dispatch(deleteBook(book._id))}
              onUpdate={() => setCurrentBook(book)}
            />
          ))}
        </div>
      ) : (
        <NoBooks />
      )}
    </div>
  );
};

export default BookList;
