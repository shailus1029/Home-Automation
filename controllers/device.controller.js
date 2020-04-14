const service = require("../services/device.service");
const { handleError } = require("../utils/error.handler");
const logger = require("../utils/logger");
const mongoose = require("mongoose");

exports.addDevice = function (req, res) {
	let errors = [];
	let isError = false;
	const body = req.body;
	return new Promise((resolve, reject) => {
		if (Object.keys(req.body).length === 0) {
			isError = true;
			handleError("noPayload", errors);
			logger.error(errors);
			if (res) {
				return res.status(400).json({ errors: errors });
			} else {
				console.error(errors);
				mongoose.connection.close();
			}
		}
		if (!body.deviceId) {
			isError = true;
			handleError("missingDeviceId", errors);
		}
		if (!body.name) {
			isError = true;
			handleError("missingDeviceName", errors);
		}
		if (isError) {
			reject(errors);
		} else {
			resolve(true);
		}
	})
		.then((resolved) => {
			return service.addDevice(body);
		})
		.then((data) => {
			if (res) {
				res.status(200).json({ data: data });
			} else {
				console.info("Device Added Successfully");
				mongoose.connection.close();
			}
		})
		.catch((err) => {
			if (res) {
				res.status(500).json({ errors: err });
			} else {
				console.info(err);
				mongoose.connection.close();
			}
		});
};

exports.getDevicesList = function (req, res) {
	let errors = [];
	let isError = false;
	return new Promise((resolve, reject) => {
		if (isError) {
			return reject(errors);
		} else {
			return resolve(true);
		}
	})
		.then((resolved) => {
			return service.getDevicesList();
		})
		.then((data) => {
			const devicesList = data.map((device) => {
				let temp = {};
				temp.id = device._id;
				temp.deviceId = device.deviceId;
				temp.name = device.name;
				temp.description = device.description;
				temp.deviceType = device.deviceType;
				temp.active = device.active;
				return temp;
			});
			if (res) {
				res.status(200).json({ devicesList });
			} else {
				console.info("----------- Devices List --------------");
				console.info(devicesList);
				console.info(`${devicesList.length} Devices Found`);
				mongoose.connection.close();
			}
		})
		.catch((err) => {
			logger.error(err);
			if (res) {
				res.status(500).json({ errors: err });
			} else {
				console.error(err);
				mongoose.connection.close();
			}
		});
};

exports.removeDevice = function (req, res) {
	let errors = [];
	let isError = false;
	return new Promise((resolve, reject) => {
		if (isError) {
			reject(errors);
		} else {
			resolve(true);
		}
	})
		.then((resolved) => {
			return service.removeDevice(req.params.id);
		})
		.then((data) => {
			if (res) {
				res.status(200).json({ data: "Device is deleted successfullty" });
			} else {
				console.info("Device removed successfully");
				mongoose.connection.close();
			}
		})
		.catch((err) => {
			logger.error(err);
			if (res) {
				res.status(500).json({ errors: err });
			} else {
				console.error(err);
				mongoose.connection.close();
			}
		});
};

exports.updateDevice = function (req, res) {
	let errors = [];
	let isError = false;
	return new Promise((resolve, reject) => {
		if (Object.keys(req.body).length === 0) {
			isError = true;
			handleError("noPayload", errors);
			logger.error(errors);
			if (res) {
				return res.status(400).json({ errors: errors });
			} else {
				console.error(errors);
				mongoose.connection.close();
			}
		}
		if (isError) {
			reject(errors);
		} else {
			resolve(true);
		}
	})
		.then((resolved) => {
			return service.updateDevice(req.params.id, req.body);
		})
		.then((data) => {
			if (res) {
				res.status(200).json({ data: data });
			} else {
				console.info("Device updated successfully");
				mongoose.connection.close();
			}
		})
		.catch((err) => {
			logger.error(err);
			if (res) {
				res.status(500).json({ errors: err });
			} else {
				console.error(err);
				mongoose.connection.close();
			}
		});
};
