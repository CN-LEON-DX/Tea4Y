const productRouters = require("./product.route");
const homeRouters = require("./home.route");
const searchRouter = require("./search.route");
const cartRouter = require("./cart.route");
const checkoutRouter = require("./checkout.route");
const userRouter = require("./user.route");
const chatRouter = require("./chat.route");

const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/client/setting.middleware");

const authMiddleware = require("../../middlewares/client/auth.middleware");


module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartID);
  app.use(userMiddleware.infoUser);
  app.use(settingMiddleware.settingGeneral);

  app.use("/", homeRouters);
  app.use("/products", productRouters);
  app.use("/search", searchRouter);
  app.use("/cart", cartRouter);
  app.use("/checkout", checkoutRouter);
  app.use("/user", userRouter);


  app.use("/chat", authMiddleware.requireAuth, chatRouter);
};
