const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL)
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

connection.on("disconnect", () => {
  console.log("MongoDb connection is disconnected!!");
})

module.exports = connection;