const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/myAccount.controller");
const authMiddleware = require("../../middlewares/admin/auth.middleware");

router.get("/", controller.index);

module.exports = router;
