
// models/product.model.js
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    userID: String,
    roomChatID: String,
    content: String,
    images: Array,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chats", chatSchema, "chats");
module.exports = Chat;
