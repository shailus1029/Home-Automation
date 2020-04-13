const service = require("../services/device.service");
const { handleError } = require("../utils/error.handler");
const logger = require("../utils/logger");

exports.addDevice = function (req, res) {
	let errors = [];
	let isError = false;
	const body = req.body;
	return new Promise((resolve, reject) => {
		if (Object.keys(req.body).length === 0) {
			isError = true;
			handleError("noPayload", errors);
			logger.error(errors);
			return res.status(400).json({ errors: errors });
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
			res.status(200).json({
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).json({ errors: err });
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
		.then((devicesList) => {
			res.status(200).json({ devicesList });
		})
		.catch((err) => {
			logger.error(err);
			res.status(500).json({ errors: err });
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
			res.status(200).json({ data: "Device is deleted successfullty" });
		})
		.catch((err) => {
			logger.error(err);
			res.status(500).json({ errors: err });
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
			return res.status(400).json({ errors: errors });
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
			res.status(200).json({ data: data });
		})
		.catch((err) => {
			logger.error(err);
			res.status(500).json({ errors: err });
		});
};
