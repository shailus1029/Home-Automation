const express = require("express");
const router = express.Router();

const deviceController = require("../controllers/device.controller");

router.post("/", deviceController.addDevice);
router.get("/deviceList", deviceController.getDevicesList);
router.patch("/:id", deviceController.updateDevice);
router.delete("/:id", deviceController.removeDevice);

module.exports = router;
