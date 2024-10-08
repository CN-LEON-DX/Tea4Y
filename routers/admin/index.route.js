const dashboardRouters = require("./dashboard.route");
const productRouters = require("./product.route");
const categoryRouters = require("./category.route");
const roleRouters = require("./role.route");
const accountRouters = require("./account.route");
const authRouters = require("./auth.router");
const systemConfig = require("../../config/system");
const myAccountRouters = require("./my-account.route");
const settingsRouters = require("./setting.route");

const authMiddleware = require("../../middlewares/admin/auth.middleware");

const authController = require("../../controllers/admin/auth.controller");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.get(PATH_ADMIN + "/", authController.login);

  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddleware.requireAuth,
    dashboardRouters
  );
  app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productRouters);
  app.use(
    PATH_ADMIN + "/category",
    authMiddleware.requireAuth,
    categoryRouters
  );

  app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, roleRouters);
  app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountRouters);
  app.use(
    PATH_ADMIN + "/my-account",
    authMiddleware.requireAuth,
    myAccountRouters
  );
  app.use(
    PATH_ADMIN + "/settings",
    authMiddleware.requireAuth,
    settingsRouters
  );
  app.use(PATH_ADMIN + "/auth", authRouters);
};
