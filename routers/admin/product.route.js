const express = require("express");
const router = express.Router();

// uploadcloud
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
// end uploadcloud

const streamifier = require("streamifier");
const multer = require("multer");
const upload = multer();

const controller = require("../../controllers/admin/product.controller");

// validate middleware
const validate = require("../../validates/admin/product.validate");

// console.log("product route");

router.get("/", controller.index);
router.patch("/edit/:id/:title/:price/:status", controller.editFast);
router.delete("/delete/:id", controller.delete);
router.delete("/delete-multiple", controller.deleteMultiple);
router.patch("/change-position/", controller.changePosition);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createProduct, // validate before create
  controller.createProduct
);
router.get("/edit/:id", controller.editProduct);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createProduct, // validate before update
  controller.updateProduct
);

router.get("/detail/:id", controller.detailProduct);

module.exports = router;
