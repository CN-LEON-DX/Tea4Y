const productRouters = require("./product.route");
const homeRouters = require("./home.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware");

module.exports = (app) => {
  app.use("/", categoryMiddleware.category, homeRouters);

  app.use("/products", categoryMiddleware.category, productRouters);
};