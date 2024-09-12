const dashboardRouters = require("./dashboard.route");
const productRouters = require("./product.route");
const categoryRouters = require("./category.route");
const roleRouters = require("./role.route");
const accountRouters = require("./account.route");
const authRouters = require("./auth.router");
const systemConfig = require("../../config/system");



module.exports = (app) => {
  console.log("admin route");
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", dashboardRouters);
  app.use(PATH_ADMIN + "/products", productRouters);
  app.use(PATH_ADMIN + "/category", categoryRouters);
  app.use(PATH_ADMIN + "/roles", roleRouters);
  app.use(PATH_ADMIN + "/accounts", accountRouters);
  app.use(PATH_ADMIN + "/auth", authRouters);

};