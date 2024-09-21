const express = require("express");
const multer = require("multer");
const cors = require("cors")
require("dotenv").config()
require("./db")

const app = express()
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("Listening to to port " + PORT);
})

