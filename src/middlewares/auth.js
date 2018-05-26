const services = require('../services');

module.exports = function(gw, next) {
	// Solo las rutas que tengan useAuth validarán que
	// el usuario esté autentificado.
	if (!gw.routing.inheritance.useAuth) {
		return next();
	}

	const auth = gw.req.headers.authorization;
	const token = auth ? auth.split(' ')[1] : false;
	
	if (!auth || !token) {
		return gw.redirect('/login');
	}

	services.decodeToken(token).then(response => {
		next();
	}).catch(error => {
		gw.errorAsJson(error.status, error.message);
	});
};