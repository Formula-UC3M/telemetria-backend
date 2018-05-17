const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RangesSchema = new Schema({
	version: { type: Number, unique: true, default: 1 },
	ecu: {
		water_temp_eng: {
			min: { type: Number, default: 0 },
			max: { type: Number, default: null },
		},
		oil_temp_eng:{
			min: { type: Number, default: 0 },
			max: { type: Number, default: null },
		},
		rpm: {
			min: { type: Number, default: 0 },
			max: { type: Number, default: null },
		}
	},
	suspension: {
		min: { type: Number, default: 0 },
		max: { type: Number, default: null },
	},
	brake_temperature: {
		min: { type: Number, default: 0 },
		max: { type: Number, default: null },
	},
	radiator_temperature: {
		min: { type: Number, default: 0 },
		max: { type: Number, default: null },
	},
	pitot: {
		min: { type: Number, default: 0 },
		max: { type: Number, default: null },
	},
	direction: {
		min: { type: Number, default: 0 },
		max: { type: Number, default: null },
	},
	upright_temperature: {
		min: { type: Number, default: 0 },
		max: { type: Number, default: null },
	},
	upleft_temperature: {
		min: { type: Number, default: 0 },
		max: { type: Number, default: null },
	},
	throttle_position: {
		min: { type: Number, default: 0 },
		max: { type: Number, default: null },
	},
	brake_position: {
		min: { type: Number, default: 0 },
		max: { type: Number, default: null },
	},
	speed: {
		min: { type: Number, default: 0 },
		max: { type: Number, default: null },
	},
	accelerometer: {
		min: { type: Number, default: 0 },
		max: { type: Number, default: null },
	},
});

const model = mongoose.model('Ranges', RangesSchema);

model.getLast = function(callback) {
	model.findOne().sort('-version').exec(callback);
};

module.exports = model;