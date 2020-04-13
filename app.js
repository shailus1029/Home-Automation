const express = require("express");
const bodyParser = require("body-parser");

// Importing DB configuration
const db = require("./config/db");

//call the database connectivity function
db();

// intilization our express app;
const app = express();
app.use(express.json());

//adding routes to application
require("./routes")(app);

//adding body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//defining the port to run the server
const port = 8000;

//listening to the port 8000
const server = app.listen(port, () => {
	console.log("server is running on  port : ", port);
});

module.exports = {
	server,
};
