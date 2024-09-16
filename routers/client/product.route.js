const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/product.controller")

router.get("/", controller.index);
router.get("/detail/:slugProduct", controller.detailProduct);
router.get("/:slugCategory", controller.category);

module.exports = router;
 