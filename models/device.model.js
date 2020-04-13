const mongoose = require("mongoose");
const schema = mongoose.Schema;

const deviceSchema = new schema(
	{
		deviceId: {
			type: String,
		},
		name: {
			type: String,
		},
		active: {
			type: Boolean,
			default: true,
		},
		description: {
			String,
		},
		deviceType: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

const addDevice = (body) => {
	const Device = mongoose.model("Device", deviceSchema);
	const device = new Device(body);
	return new Promise((resolve, reject) => {
		device.save((err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

const getDevicesList = () => {
	const Device = mongoose.model("Device", deviceSchema);
	return new Promise((resolve, reject) => {
		Device.find({}, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

const removeDevice = (id) => {
	const Device = mongoose.model("Device", deviceSchema);
	return new Promise((resolve, reject) => {
		Device.findByIdAndRemove(id, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

const updateDevice = () => {
	const Device = mongoose.model("Device", deviceSchema);
	return new Promise((resolve, reject) => {
		Device.findByIdAndUpdate(id, { $set: body }, { new: true }, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

module.exports = {
	addDevice,
	updateDevice,
	removeDevice,
	getDevicesList,
};
