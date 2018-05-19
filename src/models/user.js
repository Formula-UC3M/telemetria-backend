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

UserSchema.pre('save', function(next) {
	bcrypt.hash(this.password, 10, (err, hash) => {
		if (err) {
			return next(err);
		}

		this.password = hash;
		next();
	});
});

const model = mongoose.model('User', UserSchema);
model.findAndValidate = (email, password, cb) => {
	model.findOne({ email }).select('password').exec((err, user) => {
		if (err) {
			cb(err);
		}

		if (!user) {
			return cb('No existe ningún usuario con esas credenciales');
		}
		
		bcrypt.compare(password, user.password, (err, valid) =>{
			if (err) {
				cb(err);
			}

			cb(null, valid, user);
		});
	});
};

module.exports = model;