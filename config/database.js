require("dotenv").config();
const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URI;

module.exports.connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB successfully via Mongoose!");
  } catch (e) {
    console.error("Failed to connect to MongoDB:", e);
  }
};
