const services = require('../services');

module.exports = function(gw, next) {
	// Solo las rutas que tengan useAuth validarán que
	// el usuario esté autentificado.
	if (!gw.routing.inheritance.useAuth) {
		return next();
	}

	if (!gw.auth) {
		return gw.redirect('/login');
	}

	const token = gw.auth;
	console.log('token', token);
	services.decodeToken(token).then(response => {
		next();
	}).catch(error => {
		gw.error(error.status, Error(error.message));
	});
};