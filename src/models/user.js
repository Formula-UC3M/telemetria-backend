const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
	email: { type: String, unique: true, lowercase: true, required: true },
	displayName: String,
	password: { type: String, select: false, required: true },
	signupDate: { type: Date, default: Date.now() },
	lastLogin: Date
});

function hashPassword(password, cb) {
	return bcrypt.hash(password, 10, cb);
}

UserSchema.pre('save', function(next) {
	const user = this;

	hashPassword(user.password, (err, hash) => {
		if (err) {
			return next(err);
		}

		user.password = hash;
		next();
	});
});

const model = mongoose.model('User', UserSchema);
model.findAndValidate = (email, password, cb) => {
	model.find({ email }, (err, users) => {
		if (err) {
			cb(err);
		}

		if (!users.length) {
			return cb('No existe ningún usuario con esas credenciales');
		}
		console.log(users);
		hashPassword(users[0].password, (err, hash) => {
			if (err) {
				return cb(err);
			}
	
			bcrypt.compare(password, hash, (err, valid) =>{
				if (err) {
					cb(err);
				}

				cb(null, valid, users[0]);
			});
		});
	});
};

module.exports = model;