const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const moment = require('moment');

const RangesSchema = new Schema(
	{
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
	}, {timestamps: {createdAt: 'created'}}
);

// Añadir auto incremento de versión.
autoIncrement.initialize(mongoose.connection);
RangesSchema.plugin(autoIncrement.plugin, {
	model: 'Ranges',
	field: 'version',
	startAt: 1,
	incrementBy: 1
});

// Crear el modelo y añadir métodos personalizados.
const model = mongoose.model('Ranges', RangesSchema);

/**
 * Devuelve la última versión guardada de rangos.
 * 
 * @param {function} callback Toma dos parametros, el error (si hubiere, si no null) y el
 * 							  resultado.
 * @returns {void} Nada.
 */
model.getLast = function(callback) {
	model.findOne().sort('-version').exec(callback);
};

/**
 * Devuelve la versión de rangos que queramos obtener.
 * 
 * @param {int} version La versión que queremos obtener.
 * @param {function} callback Toma dos parametros, el error (si hubiere, si no null) y el
 * 							  resultado.
 * @returns {void} Nada.
 */
model.getVersion = function(version, callback) {
	model.findOne({ version }).exec(callback);
};

/**
 * Devuelve todas las versiones de rangos guardadas en al base de datos.
 * 
 * @param {function} callback Toma dos parametros, el error (si hubiere, si no null) y el
 * 							  resultado.
 * @returns {void} Nada.
 */
model.getAll = function(callback) {
	model.find({}, (err, allRanges) => {
		if (err) {
			return callback(err, null);
		}

		return callback(null, ...allRanges);
	});
};

/**
 * Devuelve todas las versiones de rangos guardadas en la base de datos entre las fechas
 * especificadas.
 * 
 * @param {Date} from La fecha / fecha y hora / unix dónde empieza el rango que queremos.
 * @param {Date} to La fecha / fecha y hora / unix dónde acaba el rango que queremos.
 * @param {function} callback Toma dos parametros, el error (si hubiere, si no null) y el
 * 							  resultado.
 * @returns {void} Nada.
 */
model.findByRange = function(from, to, callback) {
	model
		.find()
		.where('created')
			.gte(moment(from).unix())
			.lte(moment(to).unix())
		.exec(callback);
};

module.exports = model;