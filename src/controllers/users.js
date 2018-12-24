const User = require('../models/user');
const service = require('../services');

function signUp (gw) {
	const payload = Object.assign({}, gw.content.params);

	if (payload.secret !== process.env.CREATE_USERS_SECRET_WORD) {
		return gw.errorAsJson(500, 'Esta acción no está permitida');
	}

	User.find({ email: payload.email }, (err, dbUsers) => {
		if (err) {
			return gw.errorAsJson(
				500,
				`Error comprobando si existe el usuario con email '${ payload.email }'. Mensage: ${ err }`
			);
		}

		if (dbUsers && dbUsers.length) {
			return gw.errorAsJson(400, 'El usuario que intentas crear ya existe.');
		}

		const user = new User({
			email: payload.email,
			displayName: payload.displayName,
			password: payload.password
		});

		user.save(err => {
			if (err) {
				return gw.errorAsJson(500, `Error al crear el usuario: ${err}`);
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

	User.findAndValidate(payload.email, payload.password, (err, valid, user) => {
		if (err) {
			return gw.errorAsJson(
				500,
				`Error recuperando el usuario con email '${ payload.email }'. Mensage: ${ err }`
			);
		}
		
		if (!valid) {
			return gw.errorAsJson(500,  `La contraseña no es válida!`);
		}

		gw.json({
			message: 'Te has logueado correctamente',
			token: service.createToken(user)
		});
	});
}

module.exports = {
	signUp,
	login
};