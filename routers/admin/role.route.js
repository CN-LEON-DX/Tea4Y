const express = require("express")
const router = express.Router()

const controller = require("../../controllers/admin/role.controller");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", controller.createRoles);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", controller.updateRoles);

router.get("/permission", controller.permission);
router.patch("/permission", controller.changePermission);

module.exports = router