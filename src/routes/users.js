/* global Route */
const usersController = require('../controllers/users');

const users = new Route(
	{
		id: 'users',
		path:'/users',
		method: 'GET',
		useAuth: false
	},
	gw => {
		// Mostrar info
		gw.json({
			description: 'Rutas de inicio de sesión y registro de usuarios por ajax.',
			routes: {
				'/users/login': {
					method: 'POST',
					body: {
						email: 'Email de un usuario que exista en la base de datos.',
						password: 'Su contraseña'
					}
				},
				'/users/signup': {
					method: 'POST',
					body: {
						email: 'Email del nuevo usuario.',
						password: 'Su contraseña',
						name: 'Opcional. Nombre para mostrar.',
						secret: 'Secreto. Solo se permite crear usuarios a las personas que sepan el secreto.'
					}
				},
			}
		}, {deep: 0});
	}
);

users.routes.add(new Route(
	{
		id: 'signup',
		path: '/signup',
		method: 'POST',
		multipart: true
	},
	usersController.signUp
));

users.routes.add(new Route(
	{
		id: 'login',
		path: '/login',
		method: 'POST',
		multipart: true
	},
	usersController.login
));

module.exports = users;
