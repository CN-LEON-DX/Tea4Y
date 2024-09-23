const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/settings.controller");

// uploadcloud
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const multer = require("multer");
const upload = multer();

router.get("/general", controller.general);
router.patch(
  "/general",
  upload.single("logo"),
  uploadCloud.upload,
  controller.generalPatch
);

module.exports = router;
