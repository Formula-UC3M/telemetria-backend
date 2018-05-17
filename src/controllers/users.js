const User = require('../models/user');
const service = require('../services');

function signUp (gw) {
	const payload = Object.assign({}, gw.content.params);

	if (payload.secret !== process.env.CREATE_USERS_SECRET_WORD) {
		return gw.error(500, Error(`Esta acción no está permitida`));
	}

	User.find({ email: payload.email }, (err, dbUsers) => {
		if (err) {
			return gw.error(500,  Error(`Error comprobando si existe el usuario con email '${ payload.email }'. Message: ${ err }`));
		}

		if (dbUsers && dbUsers.length) {
			return gw.error(400, Error('El usuario que intentas crear ya existe.'));
		}

		const user = new User({
			email: payload.email,
			displayName: payload.displayName,
			password: payload.password
		});

		user.save(err => {
			if (err) {
				return gw.error(500, Error(`Error al crear el usuario: ${err}`));
			}
	
			return gw.json({
				message: 'Usuario creado con exito',
				token: service.createToken(user)
			});
		});
	});
}

function login (gw) {
	const payload = Object.assign({}, gw.content.params);

	User.find({ email: payload.email }, (err, users) => {
		if (err) {
			return gw.error(500,  Error(`Error recuperando el usuario con email '${ payload.email }'. Message: ${ err }`));
		}

		if (!users.length) {
			return gw.error(404, Error('No existe ningún usuario con esas credenciales'));
		}

		gw.json({
			message: 'Te has logueado correctamente',
			token: service.createToken(users[0])
		});
	});
}

module.exports = {
	signUp,
	login
};