const express = require("express");
const path = require('path');
const cors = require("cors")
require("dotenv").config()
require("./db")
const bookRoutes = require("./routes/book.js")

const app = express()
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

app.use("/books", bookRoutes);

app.listen(PORT, () => {
  console.log("Listening to to port " + PORT);
})

