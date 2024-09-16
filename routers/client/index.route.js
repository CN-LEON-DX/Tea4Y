const productRouters = require("./product.route");
const homeRouters = require("./home.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const searchRouter = require("./search.route");

module.exports = (app) => {
  app.use(categoryMiddleware.category);

  app.use("/", homeRouters);
  app.use("/products", productRouters);
  app.use("/search", searchRouter);
};
