// Import the dotenv package and configure it
require("dotenv").config();

const mongoose = require("mongoose");
MONGO_URI =
  "mongodb+srv://cn14-leon-dx:" +
  process.env.PASSWORD_MONGO +
  "@tea4y.dxk4h.mongodb.net/product-management?retryWrites=true&w=majority";

const connectionString = MONGO_URI;

module.exports.connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB successfully via Mongoose!");
  } catch (e) {
    console.error("Failed to connect to MongoDB:", e);
  }
};


