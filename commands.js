#!/usr/bin/env node
const program = require("commander");
const mongoose = require("mongoose");
const { prompt } = require("inquirer");
const {
	addDevice,
	removeDevice,
	updateDevice,
	getDevicesList,
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

// List all devices command
program
	.command("list")
	.alias("l")
	.description("Listing all smart devices")
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

// allow commander to parse `process.argv`
program.parse(process.argv);
