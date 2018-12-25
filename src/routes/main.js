/* global Route */
const paths = require('path');
const usersController = require('../controllers/users');
const client_folder = '../../node_modules/formula-uc3m-client';

// Static Files and main route
const mainRoute = new Route(
	{
		id: 'main',
		path: '/',
		method: 'GET',
		useAuth: true
	},
	gw => {
		gw.file(paths.resolve(__dirname, client_folder + '/dist/index.html'));
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
		useAuth: false
	},
	gw => {
		gw.render(paths.resolve(__dirname, '../views/login.jade'));
	}
));

mainRoute.routes.add(new Route(
	{
		id: 'view-logout',
		path: '/logout',
		method: 'GET'
	},
	usersController.logout
));

mainRoute.routes.add(new Route(
	{
		id: 'view-signup',
		path: '/signup',
		method: 'GET',
		useAuth: false
	},
	gw => {
		gw.render(paths.resolve(__dirname, '../views/signup.jade'));
	}
));

mainRoute.routes.add(new Route(
	{
		id: 'view-ranges',
		path: '/ranges',
		method: 'GET'
	},
	gw => {
		gw.render(paths.resolve(__dirname, '../views/ranges.jade'));
	}
));

mainRoute.routes.add(new Route({
	id: 'static-frontend',
	path: '/*:path',
	directory: {
		path: paths.resolve(__dirname, client_folder + '/dist'),
		listing: true,
	}
}));

module.exports = mainRoute;