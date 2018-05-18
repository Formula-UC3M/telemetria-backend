/* global Route */
const paths = require('path');

// Static Files and main route
const mainRoute = new Route(
	{
		id: 'main',
		path: '/',
		method: 'GET',
	},
	gw => {
		gw.file(paths.resolve(__dirname, '../../telemetria-frontend/public/index.html'));
	}
);

mainRoute.routes.add(new Route({
	id: 'static-resources',
	path: '/resources/*:path',
	directory: {
		path: paths.resolve(__dirname, '../resources'),
		listing: true,
	},
}));

mainRoute.routes.add(new Route(
	{
		id: 'view-login',
		path: '/login',
		method: 'GET',
	},
	gw => {
		gw.render(paths.resolve(__dirname, '../views/login.jade'));
	}
));

mainRoute.routes.add(new Route(
	{
		id: 'view-signup',
		path: '/signup',
		method: 'GET',
	},
	gw => {
		gw.render(paths.resolve(__dirname, '../views/signup.jade'));
	}
));

mainRoute.routes.add(new Route(
	{
		id: 'view-ranges',
		path: '/ranges',
		method: 'GET',
	},
	gw => {
		gw.render(paths.resolve(__dirname, '../views/ranges.jade'));
	}
));

mainRoute.routes.add(new Route({
	id: 'static-frontend',
	path: '/*:path',
	directory: {
		path: paths.resolve(__dirname, '../../telemetria-frontend/public'),
		listing: true,
	}
}));

module.exports = mainRoute;