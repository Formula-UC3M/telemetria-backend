/*global Route */
const routes = require('pillars').routes;
const paths = require('path');
const store = require("../store");
const storeObj = new store().init();

const saveSpecificDataRoute = new Route(
	{
		path: '/save/*:path',
		method: ["POST"]
	},
	gw => {
		const last = gw.pathParams.path.lastIndexOf('/');
		const route = gw.pathParams.path.substring(0, last);
		const value = gw.pathParams.path.substring(last + 1);

		try {
			storeObj.save(route, value);
			gw.json({ route, value });
		} catch(e) {
			console.error('Error:' +  e.message);
			gw.error(400, e.message);
		}
	}
);
routes.add(saveSpecificDataRoute);

// Static Files and main route
const mainRoute = new Route(
	{
		id: 'main',
		path: '/',
		method: 'GET',
		session: true,
	},
	gw => {
		gw.file(paths.resolve(__dirname, '../../telemetria-frontend/public/index.html'));
	}
);
const pillarsDocsStatic = new Route({
	id: 'pillarsDocsStatic',
	path: '/*:path',
	directory: {
		path: paths.resolve(__dirname, '../../telemetria-frontend/public'),
		listing: true,
	},
});
mainRoute.routes.add(pillarsDocsStatic);

// Add routes to the server
console.info('Añadiendo rutas al servidor.');
routes.add(mainRoute);
