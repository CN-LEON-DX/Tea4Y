const productRouters = require("./product.route");
const homeRouters = require("./home.route");
const searchRouter = require("./search.route");
const cartRouter = require("./cart.route")

const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");

module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartID);

  app.use("/", homeRouters);
  app.use("/products", productRouters);
  app.use("/search", searchRouter);
  app.use("/cart", cartRouter);
};
