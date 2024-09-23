const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: [String],
    required: true,
    trim: true
  },
  coverImage: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

bookSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
})

const Book = model("Book", bookSchema)

module.exports = Book;