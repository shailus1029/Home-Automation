const deviceRoutes = require("./device.route");

module.exports = (app) => {
	app.use("/api/device", deviceRoutes);
};
