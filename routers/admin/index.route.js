const dashboardRouters = require("./dashboard.route");
const productRouters = require("./product.route");
const systemConfig = require("../../config/system");

module.exports = (app) => {
  console.log("admin route");
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", dashboardRouters);
  app.use(PATH_ADMIN + "/products", productRouters);
};
