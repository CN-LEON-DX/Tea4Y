module.exports.index = async (req, res) => {
  // socket io
  _io.on("connection", (socket) => {
    console.log("a user connected");
  });
  // end socket io
  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
  });
};
