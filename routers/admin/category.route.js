const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/category.controller");

// uploadcloud
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
// end uploadcloud

const validate = require("../../validates/admin/category.validate");

const streamifier = require("streamifier");
const multer = require("multer");
const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createCategory,
  controller.createCategory
);

module.exports = router;
