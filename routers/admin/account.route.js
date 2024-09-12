const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/account.controller");

const validate = require("../../validates/admin/account.validate");

// uploadcloud
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
// end uploadcloud

const multer = require("multer");
const upload = multer();

router.get("/", controller.index);
router.get("/create", controller.createAccount);
router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.createAcc,
  controller.addAccount
);

module.exports = router;
