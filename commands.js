#!/usr/bin/env node
const program = require("commander");
const mongoose = require("mongoose");
const { prompt } = require("inquirer");
const {
	addDevice,
	removeDevice,
	updateDevice,
	getDevicesList,
	changeDeviceStatus,
	getInactiveDevicesList,
} = require("./controllers/device.controller");

// Database URL
const databaseURL = "mongodb://localhost:27017/home-automation";

// Writing this to ignore warning ---> collection.ensureIndex is deprecated
mongoose.set("useCreateIndex", true);

// Connecting to the Database
mongoose.connect(databaseURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

program.version("1.0.0").description("Home Device Management System");

// Device Questions
const deviceQuestion = [
	{
		type: "input",
		name: "deviceId",
		message: "Device Id *",
	},
	{
		type: "input",
		name: "name",
		message: "Device Name",
	},
	{
		type: "input",
		name: "description",
		message: "Device Description",
	},
	{
		type: "input",
		name: "deviceType",
		message: "Device Type",
	},
];

const inActiveStatusQuestion = [
	{
		type: "confirm",
		name: "active",
		message: "Do you want to inactive the device ?",
		default: false,
	},
];

const activeStatusQuestion = [
	{
		type: "confirm",
		name: "active",
		message: "Do you want to active the device ?",
		default: false,
	},
];

// Add device command
program
	.command("add")
	.alias("a")
	.description("Add a device")
	.action(() => {
		prompt(deviceQuestion).then((answers) => {
			const reqObject = {
				body: answers,
			};
			addDevice(reqObject);
		});
	});

// List all active devices command
program
	.command("list")
	.alias("l")
	.description("Listing all active smart devices")
	.action(() => {
		getDevicesList();
	});

// remove device command
program
	.command("remove <id>")
	.alias("r")
	.description("Remove an installed device")
	.action((id) => {
		const reqObject = {
			params: { id },
		};
		removeDevice(reqObject);
	});

// update device command
program
	.command("update <id>")
	.alias("u")
	.description("Update a Device")
	.action((id) => {
		prompt(deviceQuestion).then((answers) => {
			const reqObject = {
				params: { id },
				body: answers,
			};
			updateDevice(reqObject);
		});
	});

// List all Inactive command
program
	.command("inactive-list")
	.alias("i-l")
	.description("Listing all inactive smart devices")
	.action(() => {
		getInactiveDevicesList();
	});

// Change device status to inactive status
program
	.command("inactive <id>")
	.alias("ch")
	.description("Put a device in  inactive status")
	.action((id) => {
		prompt(inActiveStatusQuestion).then((answer) => {
			const reqObject = {
				params: { id },
				body: {
					active: !answer.active,
				},
			};
			if (answer.active) {
				changeDeviceStatus(reqObject);
			} else {
				mongoose.connection.close();
			}
		});
	});

// Change device status to active status
program
	.command("active <id>")
	.alias("ac")
	.description("Put a device in active status")
	.action((id) => {
		prompt(activeStatusQuestion).then((answer) => {
			const reqObject = {
				params: { id },
				body: {
					active: answer.active,
				},
			};
			if (answer.active) {
				changeDeviceStatus(reqObject);
			} else {
				mongoose.connection.close();
			}
		});
	});

// allow commander to parse `process.argv`
program.parse(process.argv);
