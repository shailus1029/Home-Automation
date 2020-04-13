const errors = {
	noPayload: { code: "NO_PAYLOAD", msg: "Payload is missing" },
	missingDeviceId: { code: "MISSING_DEVICE_ID", msg: "deviceId is missing" },
	missingDeviceName: {
		code: "MISSING_DEVICE_NAME",
		msg: "name is missing",
	},
};

module.exports = {
	errors,
};
