const mongoose = require('mongoose');
const dataSquema = mongoose.Schema(
	{
		timestamp: {type: String},
		ecu: {
			water_temp_eng: {type: Number},
			oil_temp_eng: {type: Number},
			rpm: {type: Number},
		},
		wfl: {
      //Wheel front left
			suspension: {type: Number},
			brake_temperature: {type: Number}
		},
		wfr: {
      //Wheel front right
			suspension: {type: Number},
			brake_temperature: {type: Number}
		},
		wbl: {
      //Wheel back left
			suspension: {type: Number},
			brake_temperature: {type: Number}
		},
		wbr: {
      //Wheel back right
			suspension: {type: Number},
			brake_temperature: {type: Number}
		},
		radiator_temperature: {
			_1: {type: Number},
			_2: {type: Number},
			_3: {type: Number}
		},
		pitot: {type: Number},
		direction: {type: Number},
		upright_temperature: {type: Number},
		upleft_temperature: {type: Number},
		throttle_position: {type: Number},
		brake_position: {type: Number},
		clutch: {type: Boolean},
		speed: {type: Number},
		accelerometer: {
			_1: {type: Number},
			_2: {type: Number},
			_3: {type: Number}
		}
	},
  {timestamps: {createdAt: 'created', updatedAt: 'updated'}}
);
module.exports = mongoose.model('data', dataSquema);
