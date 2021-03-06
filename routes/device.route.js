const express = require("express");
const router = express.Router();

const deviceController = require("../controllers/device.controller");

router.post("/", deviceController.addDevice);
router.get("/list", deviceController.getDevicesList);
router.patch("/:id", deviceController.updateDevice);
router.delete("/:id", deviceController.removeDevice);
router.put("/changeStatus/:id", deviceController.changeDeviceStatus);
router.get("/inactiveDevicesList", deviceController.getInactiveDevicesList);

module.exports = router;
