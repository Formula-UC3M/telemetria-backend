// Fake data generator
const RangesModel = require('../../models/ranges');

// Definir rutas de datos de cada rango.
const routesByRange = [
	{
		range: 'ecu.waterTempEng',
		routes: ['ecu/water_temp_eng']
	},
	{
		range: 'ecu.oilTempEng',
		routes: ['ecu/oil_temp_eng']
	},
	{
		range: 'ecu.rpm',
		routes: ['ecu/rpm']
	},
	{
		range: 'suspension',
		routes: [
			'wfl/suspension',
			'wfr/suspension',
			'wbl/suspension',
			'wbr/suspension'
		]
	},
	{
		range: 'brakeTemperature',
		routes: [
			'wfl/brake_temperature',
			'wfr/brake_temperature',
			'wbl/brake_temperature',
			'wbr/brake_temperature'
		]
	},
	{
		range: 'radiatorTemperature',
		routes: [
			'radiator_temperature/sensor_1',
			'radiator_temperature/sensor_2',
			'radiator_temperature/sensor_3',
		]
	},
	{
		range: 'pitot',
		routes: ['pitot']
	},
	{
		range: 'direction',
		routes: ['direction']
	},
	{
		range: 'uprightTemperature',
		routes: ['upright_temperature']
	},
	{
		range: 'throttlePosition',
		routes: ['throttle_position']
	},
	{
		range: 'brakePosition',
		routes: ['brake_position']
	},
	{
		range: 'speed',
		routes: ['speed']
	},
	{
		range: 'accelerometer',
		routes:  [
			'accelerometer/sensor_1',
			'accelerometer/sensor_2',
			'accelerometer/sensor_3',
		]
	},
];

function validateRanges(ranges) {
	return routesByRange.every(element => {
		let range = ranges[element.range];

		if (element.range.startsWith('ecu.')) {
			range = ranges.ecu[element.range.split('.')[1]];
		}

		const valid = range.min !== undefined && range.max !== undefined;

		if (valid && range.min > range.max) {
			throw Error(`
				El rango máximo en el elemento ${ element.range }, no puede ser mayor
				que el rango mínimo.
			`);
		}

		return valid;
	});
}

module.exports =  function(moscaMQTTServer, ranges, incrementPercentage, everyMs) {
	function publish(route, value, callback) {
		moscaMQTTServer.publish({
			topic: 'formula-fake-data/' + route,
			payload: value,
			qos: 1
		}, null, callback);
	}

	function publishInterval(every, route, min, max, addition, current) {
		if (current > max) {
			return publishInterval(every, route, min, max, addition, min);
		}

		publish(route, current, () => {
			setTimeout(() => publishInterval(
				every,
				route,
				min,
				max,
				addition,
				current + addition
			), every);
		});
	}

	function publishBooleanInterval(route, value, delay) {
		setTimeout(() => {
			publish(route, value, () => publishBooleanInterval(route, value * -1, delay));
		}, delay + (Math.random() * 3000 * value));
	}

	// Pedir los rangos y si no están aun configurados decirlo por consola y acabar.
	RangesModel.getLast((err, ranges) => {
		if (err) {
			throw err;
		}

		if (!ranges) {
			return console.error(`
				Para poder generar datos de prueba necesitas configurar los rangos de los
				sensores. Puedes hacerlo en /ranges.
			`);
		}

		if (!validateRanges(ranges)) {
			return console.error(`
				Hay rangos sin configurar todavía. Para poder generar los datos de prueba
				han de estar todos los rangos configurados.
			`);
		}

		routesByRange.forEach(element => {
			// Cada conjunto de rutas publicadas cada everyMs +2 -3 +1... ms para variar un poco.
			const every = everyMs + Math.random() * 10 - 5;
			let range;
	
			if (element.range.startsWith('ecu')) {
				const rangeKey = element.range.split('.')[1];
				range = ranges.ecu[rangeKey];
			} else {
				range = ranges[element.range];
			}
	
			const addition = (range.max - range.min) * incrementPercentage / 100;
			element.routes.forEach(route => publishInterval(
				every,
				route,
				range.min,
				range.max,
				addition,
				range.min
			));
		});
	
		// Publicar cambios en clutch cada entre 2 y 8 segundos.
		publishBooleanInterval('clutch', 1, 5000);
	});
};