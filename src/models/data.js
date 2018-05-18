const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const dataSquema = new Schema(
	{
		timestamp: { type: String, default: Date.now() },
		ecu: {
			water_temp_eng: { type: Number, default: null },
			oil_temp_eng: { type: Number, default: null },
			rpm: { type: Number, default: null },
		},
		wfl: {
			//Wheel front left
			suspension: { type: Number, default: null },
			brake_temperature: { type: Number, default: null },
		},
		wfr: {
			//Wheel front right
			suspension: { type: Number, default: null },
			brake_temperature: { type: Number, default: null },
		},
		wbl: {
			//Wheel back left
			suspension: { type: Number, default: null },
			brake_temperature: { type: Number, default: null },
		},
		wbr: {
			//Wheel back right
			suspension: { type: Number, default: null },
			brake_temperature: { type: Number, default: null },
		},
		radiator_temperature: {
			_1: { type: Number, default: null },
			_2: { type: Number, default: null },
			_3: { type: Number, default: null },
		},
		pitot: { type: Number, default: null },
		direction: { type: Number, default: null },
		upright_temperature: { type: Number, default: null },
		upleft_temperature: { type: Number, default: null },
		throttle_position: { type: Number, default: null },
		brake_position: { type: Number, default: null },
		clutch:  { type: Boolean, default: null },
		speed: { type: Number, default: null },
		accelerometer: {
			_1: { type: Number, default: null },
			_2: { type: Number, default: null },
			_3: { type: Number, default: null },
		}
	},
	{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);

const model = mongoose.model('Data', dataSquema);

model.findByRange = function(from, to, callback) {
	model
		.find()
		.where('timestanp')
			.gte(moment(from).unix())
			.lte(moment(to).unix())
		.exec(callback);
};

module.exports = model;