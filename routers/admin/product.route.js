const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/admin/auth.middleware");

// uploadcloud
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const multer = require("multer");
const upload = multer();

const controller = require("../../controllers/admin/product.controller");

// validate middleware
const validate = require("../../validates/admin/product.validate");

// Routes with Permission Checking
router.get(
  "/",
  authMiddleware.checkPermission("product-view"),
  controller.index
);

router.patch(
  "/edit/:id/:title/:price/:status",
  authMiddleware.checkPermission("product-edit"),
  controller.editFast
);

router.delete(
  "/delete/:id",
  authMiddleware.checkPermission("product-delete"),
  controller.delete
);

router.delete(
  "/delete-multiple",
  authMiddleware.checkPermission("product-delete"),
  controller.deleteMultiple
);

router.patch(
  "/change-position/",
  authMiddleware.checkPermission("product-edi"),
  controller.changePosition
);

router.get(
  "/create",
  authMiddleware.checkPermission("product-create"),
  controller.create
);

router.post(
  "/create",
  authMiddleware.checkPermission("product-create"),
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createProduct, // validate before create
  controller.createProduct
);

router.get(
  "/edit/:id",
  authMiddleware.checkPermission("product-edit"),
  controller.editProduct
);

router.patch(
  "/edit/:id",
  authMiddleware.checkPermission("product-edit"),
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createProduct, // validate before update
  controller.updateProduct
);

router.get(
  "/detail/:id",
  authMiddleware.checkPermission("product-view"),
  controller.detailProduct
);

module.exports = router;
