/*global Route */
const routes = require('pillars').routes;

// Static Files and main route
const mainRoute = new Route({
	id: 'main',
	path: '/',
	method: 'GET',
	session: true
}, gw => {
	gw.file('./src/public/index.html');
});

// Add routes to the server
console.info('Añadiendo rutas al servidor.');
routes.add(mainRoute);
