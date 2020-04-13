/*
  1st step : Please add your error type with code and message inside error const defined below
  2nd step : Make sure the error type should not get repeated. for eg. invalidUsername might be invalid at several places.
  3rd step : call the function handleErr from your file with following params
  				a. errType - A valid error type which should be defined in errors object
  				b. arr - An array which contains all the errors
*/

const { errors } = require("./constant");

function handleError(errType, arr) {
	return arr.push({
		code: errors[errType].code,
		message: errors[errType].msg,
	});
}

module.exports = {
	handleError,
};
