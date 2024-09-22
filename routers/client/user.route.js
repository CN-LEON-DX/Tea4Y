const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");
const authMiddleware = require("../../middlewares/client/auth.middleware");



router.get("/register", controller.register);
router.post("/register", validate.registerValid, controller.registerAccount);

router.get("/login", controller.login);
router.post("/login", validate.loginValid, controller.loginAccount);

router.get("/logout", controller.logoutAccount);

router.get("/password/forgot", controller.forgot);
router.post(
  "/password/forgot",
  validate.forgotPassword,
  controller.forgotPasswordPost
);

router.get("/password/otp-password", controller.otpPassword);
router.post("/password/otp-password", controller.otpPasswordPost);


router.get("/password/reset", controller.resetPassword);
router.post("/password/reset", validate.passwordMatch, controller.resetPasswordPost);


router.get("/info",authMiddleware.requireAuth, controller.infoUser);
module.exports = router;
