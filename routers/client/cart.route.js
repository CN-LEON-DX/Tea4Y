const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/cart.controller");

router.post("/add/:id", controller.addPostProduct);
router.get("/", controller.index);
router.get("/delete/:id", controller.deleteProduct);
router.post("/update-quantities", controller.updateQuantities);

module.exports = router;
