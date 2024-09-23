const express = require('express');
const router = express.Router();
const Book = require("../models/Book")
const { body, validationResult } = require("express-validator")

// Middleware for validating book input 
const bookValidationRules = [
  body('title').isString().trim().notEmpty().withMessage('Title is required'),
  body('author').isString().trim().notEmpty().withMessage('Author is required'),
  body('genre').isArray().withMessage('Genre must be an array').bail()
    .custom((arr) => arr.every(genre => typeof genre === 'string' && genre.trim() !== ''))
    .withMessage('Each genre must be a non-empty string'),
  // body('coverImage').isURL().withMessage('Valid cover image URL is required')
];

// Utility to check validation results.
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get("/", async (req, res) => {
  try {
    const book = await Book.find();
    console.log("books", book);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Interal server error", error })
  }
})

router.post("/", bookValidationRules, validate, async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(200).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: "Interal server error", error })
  }
})

router.put("/:id", validate, async (req, res) => {
  const id = req?.params?.id;
  console.log("in put", id);

  try {
    const updatedBook = await Book.findOneAndUpdate({ _id: id }, req?.body, {
      new: true,
      runValidators: true,
    })

    console.log("inside put");

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found." })
    }

    res.status(200).json(updatedBook);

  } catch (error) {
    console.error("Update error: ", error);
    res.status(500).json({ message: "Interal server error", error })
  }
})

router.delete("/:id", async (req, res) => {
  const id = req?.params?.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found." })
    }

    res.status(200).json(deletedBook);
  } catch (error) {
    res.status(500).json({ message: "Interal server error", error })
  }
})

module.exports = router;