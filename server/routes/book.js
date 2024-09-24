const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  validate,
  bookValidationRules,
} = require("../middleware/bookValidation");
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../controller/book");

// To get the available books.
router.get("/", getBooks);

// To add a new book
router.post(
  "/",
  upload.single("coverImage"),
  bookValidationRules,
  validate,
  createBook
);

// To update any existing book.
router.put(
  "/:id",
  upload.single("coverImage"),
  bookValidationRules,
  validate,
  updateBook
);

// To delete any existing book.
router.delete("/:id", deleteBook);

module.exports = router;
