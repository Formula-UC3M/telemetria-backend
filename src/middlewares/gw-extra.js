module.exports = function(gw, next) {
	gw.errorAsJson = require('../lib/errorAsJson');
	next();
};