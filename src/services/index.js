const jwt = require('jwt-simple');
const moment = require('moment');

function createToken (user) {
	return jwt.encode({
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(process.env.JWT_TOKEN_EXP_DAYS, 'days').unix()
	}, process.env.JWT_SECRET_TOKEN);
}

function decodeToken (token) {
	return new Promise((resolve, reject) => {
		try {
			const payload = jwt.decode(token, process.env.JWT_SECRET_TOKEN);

			if (payload.exp <= moment().unix()) {
				reject({
					status: 401,
					message: 'El token ha expirado'
				});
			}
			resolve(payload.sub);
		} catch (err) {
			reject({
				status: 500,
				message: 'Invalid Token'
			});
		}
	});
}

module.exports = {
	createToken,
	decodeToken
};