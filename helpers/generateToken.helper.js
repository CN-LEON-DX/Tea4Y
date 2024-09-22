module.exports.genRandomKey = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports.genOTP = (length) => {
  const figures = "0123456789";
  let result = "";
  const charactersLength = figures.length;
  for (let i = 0; i < length; i++) {
    result += figures.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
