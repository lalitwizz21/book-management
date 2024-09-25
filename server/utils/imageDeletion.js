const fs = require("fs");
const path = require("path");

const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return reject(err);
      }
      console.log("File deleted successfully");
      resolve();
    });
  });
};

const getFilePath = (filename) => {
  return path.join(__dirname, "../uploads", filename);
};

module.exports = { deleteFile, getFilePath };
