import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL + "/books";
console.log("api", apiUrl);

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  console.log("in api");
  try {
    const response = await axios.get(`${apiUrl}?page=1&limit=100`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const addBook = createAsyncThunk("books/addBook", async (book) => {
  try {
    const formData = handleFormData(book);
    console.log("create thunk", formData);
    const response = await axios.post(apiUrl, formData);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, book }) => {
    try {
      const formData = handleFormData(book);
      console.log("update thunk", formData);
      const response = await axios.put(`${apiUrl}/${id}`, formData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    return id;
  } catch (error) {
    return error.response.data;
  }
});

// To handle the data for all type fo data.
const handleFormData = (book) => {
  const updatedBook = { ...book, genre: book?.genre?.split(",") };
  const formData = new FormData();
  for (const key in updatedBook) {
    if (Array.isArray(updatedBook[key])) {
      updatedBook[key].forEach((genre) => {
        formData.append(`${key}[]`, genre);
      });
    } else {
      formData.append(key, updatedBook[key]);
    }
  }

  return formData;
};
