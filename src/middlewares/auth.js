const services = require('../services');

module.exports = function(gw, next) {
	// Solo las rutas que tengan useAuth validarán que
	// el usuario esté autentificado.
	if (!gw.routing.inheritance.useAuth) {
		return next();
	}

	// Se acepta tanto mandar el token de autenticación cómo usar la cookie.
	const auth = gw.req.headers.authorization;
	const cookieToken = gw.cookie.authorization;
	const token = cookieToken ? cookieToken : (auth ? auth.split(' ')[1] : false);

	if (!token) {
		return gw.redirect('/login');
	}

	services.decodeToken(token).then(response => {
		next();
	}).catch(error => {
		gw.errorAsJson(error.status, error.message);
	});
};