const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from a .env file
require("./db"); // Connect to the database (MongoDB or other)
const bookRoutes = require("./routes/book.js"); // Import book routes

// Create an Express application
const app = express();
const PORT = process.env.PORT || 4000; // Set the port from environment variable or default to 4000

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded requests (form data)
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., images) from the "uploads" directory
app.use("/uploads", express.static("uploads"));

// Use the book routes for any requests to "/books"
app.use("/books", bookRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});
