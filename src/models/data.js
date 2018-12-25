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
			upright_temperature: { type: Number, default: null }
		},
		wbr: {

			//Wheel back right
			suspension: { type: Number, default: null },
			brake_temperature: { type: Number, default: null },
			upright_temperature: { type: Number, default: null }
		},
		radiator_temperature: {
			sensor_in: { type: Number, default: null },
			sensor_middle: { type: Number, default: null },
			sensor_out: { type: Number, default: null },
			sensor_t: { type: Number, default: null }
		},
		throttle_position: { type: Number, default: null },
		brake_position: { type: Number, default: null },
		speed: { type: Number, default: null }
	},
	{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);

const model = mongoose.model('Data', dataSquema);

model.findByRange = function(from, to, callback) {
	const modelInst = model
		.find()
		.where('timestamp')
			.gte(moment(from).unix())
			
	if (to) {
		modelInst.lte(moment(to).unix())
	}
	
	modelInst.exec(callback);
};

module.exports = model;