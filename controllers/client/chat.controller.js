const { isObjectIdOrHexString } = require("mongoose");
const Chat = require("../../models/chats.model");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
  const userID = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  // socket io

  // on # once
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      // save in DB
      const chat = new Chat({
        userID: userID,
        content: content,
      });
      await chat.save();

      // after send message return this msg to client
      _io.emit("SERVER_RETURN_MESSAGE", {
        userID: userID,
        fullName: fullName,
        content: content,
      });
    });
  });
  // end socket io

  // get data
  const chats = await Chat.find({ deleted: false });

  for (const chat of chats) {
    const inforUser = await User.findOne({
      _id: chat.userID,
    }).select("fullName");

    chat.inforUser = inforUser;
  }
  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats,
  });
};
