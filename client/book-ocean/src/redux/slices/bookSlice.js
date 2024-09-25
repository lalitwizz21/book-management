import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../thunks/bookThunks";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    totalBooks: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        console.log("fulfilled get", JSON.stringify(state, null, 2));
        state.loading = false;
        state.books = action.payload.books;
        state.totalBooks = action.payload.totalBooks;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        console.log("fulfilled add", JSON.stringify(state, null, 2));
        state.books.push(action.payload);
        state.totalBooks += 1;
        toast.success("Book added successfully.");
      })
      .addCase(addBook.rejected, (state, action) => {
        console.log("fulfilled update", JSON.stringify(state, null, 2));
        state.error = action.error.message;
        toast.error("Failed to add the Book.");
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        console.log("fulfilled update", JSON.stringify(state, null, 2));
        const index = state.books.findIndex(
          (book) => book._id === action.payload._id
        );
        if (index !== -1) {
          state.books[index] = action.payload;
        }
        toast.success("Book updated successfully.");
      })
      .addCase(updateBook.rejected, (state, action) => {
        console.log("fulfilled update", JSON.stringify(state, null, 2));
        state.error = action.error.message;
        toast.error("Failed to update the Book.");
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        console.log("fulfilled delete", JSON.stringify(state, null, 2));
        state.books = state.books.filter((book) => book._id !== action.payload);
        state.totalBooks = Math.max(0, state.totalBooks - 1);
        toast.success("Book deleted successfully.");
      })
      .addCase(deleteBook.rejected, (state, action) => {
        console.log("fulfilled update", JSON.stringify(state, null, 2));
        state.error = action.error.message;
        toast.error("Failed to deleted the Book.");
      });
  },
});

export default bookSlice.reducer;
