process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const path = require("path");

const rootPath = path.resolve(`${__dirname}/..`);

const envConfiguration = require(`./environment/${process.env.NODE_ENV}.config.js`);

module.exports = {
	rootPath,
	envConfiguration,
};
