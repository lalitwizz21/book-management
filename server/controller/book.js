const Book = require("../models/Book");
const { processImage } = require("../utils/imageHandler");
const { deleteFile, getFilePath } = require("../utils/imageDeletion");

// Get the books.
const getBooks = async (req, res) => {
  const page = parseInt(req.query?.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query?.limit) || 10; // Default to page 10 if not provided
  const skip = (page - 1) * limit; // Calculate the number of items to skip

  try {
    // Get the total count of books
    const totalBooks = await Book.countDocuments();

    // Fetch books with pagination
    const books = await Book.find().skip(skip).limit(limit);
    console.log("books", books);

    // Return the list of books as JSON response.
    res.status(200).json({
      totalBooks, // Total number of books for calculating total pages
      totalPages: Math.ceil(totalBooks / limit), // Calculate total pages
      currentPage: page, // Current page number
      books, // The array of books for the current page
    });
  } catch (error) {
    console.log("error", error);
    // Return an error response if there is any error.
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Create a new book..
const createBook = async (req, res) => {
  console.log("file", req?.file);
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    // Process the uploaded image and generate a URL
    const coverImageUrl = await processImage(req.file);

    // Create a new book object with the data from the request body
    const book = new Book(req.body);
    book.coverImage = coverImageUrl;
    console.log("book", book);

    // Save the book to the database
    const savedBook = await book.save();

    // Return the saved book as JSON response
    res.status(200).json(savedBook);
  } catch (error) {
    console.log("error", error);
    // Return an error response if there is any error
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Update a book by ID.
const updateBook = async (req, res) => {
  const id = req?.params?.id;
  console.log("in put", id);

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    // Find the existing book
    const existingBook = await Book.findById(id);
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found." });
    }

    const updatedData = { ...req.body };
    if (req.file) {
      // Setting the new cover image to the book.
      const coverImageUrl = await processImage(req.file);
      console.log("coverImageUrl", coverImageUrl);
      updatedData.coverImage = coverImageUrl;

      // Delete the old cover image to the book.
      const oldFilePath = getFilePath(existingBook.coverImage.split("/").pop());
      await deleteFile(oldFilePath);
    }

    // finding the updating the book with the provided data.
    const updatedBook = await Book.findOneAndUpdate({ _id: id }, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      // Return an error response if book not found.
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    // Return an error response if there is any error
    console.error("Update error: ", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

//  Delete a book by ID.
const deleteBook = async (req, res) => {
  const id = req?.params?.id;

  try {
    // Find the book to delete
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      // Return an error response if book not found.
      return res.status(404).json({ message: "Book not found." });
    }

    // Delete the cover image of the book
    const filePath = getFilePath(deletedBook.coverImage?.split("/")?.pop());
    console.log("filePath", filePath, deletedBook.coverImage);
    await deleteFile(filePath);

    // Return the deleted book as JSON response
    res.status(200).json(deletedBook);
  } catch (error) {
    console.log("error", error);
    // Return an error response if there is any error
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
