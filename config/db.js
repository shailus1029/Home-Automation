const mongoose = require("mongoose");

const databaseURL = "mongodb://localhost:27017/home-automation";

module.exports = function () {
	mongoose.connect(databaseURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	mongoose.connection.on("connected", () => {
		console.log("mongoose connection is started");
	});

	mongoose.connection.on("error", (err) => {
		console.log(
			error("Mongoose default connection has occured " + err + " error"),
		);
	});

	mongoose.connection.on("disconnected", () => {
		console.log(disconnected("Mongoose default connection is disconnected"));
	});

	process.on("SIGINT", () => {
		mongoose.connection.close(() => {
			console.log(
				termination(
					"Mongoose default connection is disconnected due to application termination",
				),
			);
			process.exit(0);
		});
	});
};
