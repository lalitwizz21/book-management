const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Book = require("../models/Book")
const sharp = require("sharp");
const upload = require("../middleware/multer");
const { bookValidationRules, validate } = require("../middleware/bookValidation")

router.get("/", async (req, res) => {
  try {
    const book = await Book.find();
    console.log("books", book);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Interal server error", error })
  }
})

router.post("/", upload.single('coverImage'), bookValidationRules, validate, async (req, res) => {
  try {
    console.log("file", req?.file);
    const book = new Book(req.body);

    const originalFilePath = path.normalize(req.file.path); // Normalize the path
    const webpFilePath = `uploads/compressed_${Date.now()}.webp`;

    // Convert image to WebP format and compress it
    await sharp(originalFilePath)
      .resize(800, 800, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFormat('webp', { quality: 80 }) // Convert to WebP and compress
      .toFile(webpFilePath);

    // book.coverImage = `/uploads/${req.file.filename}`;
    book.coverImage = webpFilePath;
    console.log("book", book);

    // Delete the original uploaded file to save space (optional)
    fs.unlinkSync(originalFilePath);

    const savedBook = await book.save();
    res.status(200).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: "Interal server error", error })
  }
})

router.put("/:id", upload.single('coverImage'), validate, async (req, res) => {
  const id = req?.params?.id;
  console.log("in put", id);

  try {
    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.coverImage = `/uploads/${req.file.filename}`; // Update the cover image if provided
    }

    const updatedBook = await Book.findOneAndUpdate({ _id: id }, updatedData, {
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