const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/register.validate");

router.get("/register", controller.register);
router.post("/register", controller.registerAccount);

router.get("/signup", controller.signup);

module.exports = router;
