const deviceModel = require("../models/device.model");

exports.addDevice = async function (body) {
	return deviceModel.addDevice(body).then((data) => {
		return data;
	});
};

exports.getDevicesList = async function () {
	return deviceModel.getDevicesList().then((devicesList) => {
		return devicesList;
	});
};

exports.updateDevice = async function (id, body) {
	return deviceModel.updateDevice(id, body).then((data) => {
		return data;
	});
};

exports.removeDevice = async function (id) {
	return deviceModel.removeDevice(id).then((data) => {
		return data;
	});
};
