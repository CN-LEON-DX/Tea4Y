const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/register.validate");


router.get("/register", controller.register);
router.post("/register", validate.registerValid, controller.registerAccount);

router.get("/login", controller.login);
router.post("/login", validate.loginValid, controller.loginAccount);

module.exports = router;
