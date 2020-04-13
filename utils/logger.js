const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const fs = require("fs-extra");
const path = require("path");
const config = require("../config");

const logDirectory = `${config.rootPath}/logs`;

// Create the log directory if it does not exist
if (!fs.existsSync(logDirectory)) {
	fs.mkdirSync(logDirectory);
}

const date = new Date();
const dateDDMMYYYY = `${date.getDate()}-${
	date.getMonth() + 1
}-${date.getUTCFullYear()}`;

// creating separate log file for everyday
// - Write all logs error (and below) to `-error file`.
const dailyRotateFileTransportErroType = new transports.DailyRotateFile({
	filename: `${logDirectory}/app-${dateDDMMYYYY}-error.log`,
	level: "error",
	datePattern: "YYYY-MM-DD",
});

// - Write to all logs with level `info` and below to `-info file`
const dailyRotateFileTransportInfoType = new transports.DailyRotateFile({
	filename: `${logDirectory}/app-${dateDDMMYYYY}-info.log`,
	level: "info",
	datePattern: "YYYY-MM-DD",
});

// Ignore log messages if they have { private: true }
const ignorePrivate = format((info, opts) => {
	if (info.private) {
		return false;
	}
	return info;
});

const option = {
	level: config.envConfiguration.logLevel,
	format: format.combine(
		ignorePrivate(),
		format.label({ label: path.basename(process.mainModule.filename) }),
		format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		format.printf(
			(info) =>
				`${info.timestamp} ${info.level} [${info.label}]: ${info.message}`,
		),
		format.json(),
	),
	transports: [
		new transports.Console({ level: "error" }),
		dailyRotateFileTransportErroType,
		dailyRotateFileTransportInfoType,
	],
};

const logger = createLogger(option);

module.exports = logger;
