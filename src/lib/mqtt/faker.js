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
			'radiator_temperature/sensor_in',
			'radiator_temperature/sensor_middle',
			'radiator_temperature/sensor_out',
			'radiator_temperature/sensor_t'
		]
	},
	{
		range: 'uprightTemperature',
		routes: [
			'wbl/upright_temperature',
			'wbr/upright_temperature'
		]
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
	}
];

/**
 * Comprueba si los rangos tienen todos un mínimo y un máximo y a su vez el ese mínimo no
 * es mayor que el máximo.
 *
 * @param {object} ranges Última versión de los rangos de valores válidos de los sensores.
 * @returns {boolean} Validos o no.
 */
function validateRanges(ranges) {
	return routesByRange.every(element => {
		let range = ranges[element.range];

		if (element.range.startsWith('ecu.')) {
			range = ranges.ecu[element.range.split('.')[1]];
		}

		// Old ranges no longer in use.
		if (!range) {
			return true;
		}

		const valid = range.min !== undefined && range.max !== undefined;

		if (range.min > range.max) {
			throw Error(`
				El rango máximo en el elemento ${ element.range }, no puede ser mayor
				que el rango mínimo.
			`);
		}

		return valid;
	});
}

/**
 * Publica valores cada cierto tiempo en todas las rutas de los diferentes sensores. Estes
 * valores están siempre entre el mínimo y el máximo de los rangos para cada ruta. Se van
 * publicando valores en aumento hasta llegar al máximo del rango y entonces se empieza
 * otra vez desde el mínimo. Aunque se toma baseIntervalTime como referencia los valores
 * de cada ruta se publican con un poco de espacio entre ellas de tal forma que sea más
 * realista.
 *
 * NOTA: Para poder usar el faker de datos, debes configurarlo en tu archivo .env, mira
 * cómo está en .env.example para tener una referencia.
 *
 * NOTA 2: La aplicación debe de tener los rangos de los sensores configurados para que
 * el faker funcione. Actualización: Ahora mismo usa rangos por defecto en caso de no
 * tenerlos configurados pero es recomendable ajustarlos a los que necesitemos para las
 * pruebas.
 *
 * @param {object} moscaMQTTServer Instancia de un servidor de mosca.
 * @param {int} incrementPercentage Porcentaje de aumento del valor por iteración.
 * @param {int} baseIntervalTime Tiempo medio entre publicado de valores.
 * @returns {void} Nada.
 */
module.exports =  function(moscaMQTTServer, incrementPercentage, baseIntervalTime) {

	/**
	 * Publica un valor en una ruta (topic).
	 *
	 * @param {string} route Ruta (parte del topic) dónde publicar datos.
	 * @param {float | int | string} value Valor a publicar.
	 * @param {function} callback Función llamada cuando se termina de publicar el dato.
	 * @return {void} Nada.
	 */
	function publish(route, value, callback) {
		console.log(route, value);
		try {
			moscaMQTTServer.publish({
				topic: 'formula-fake-data/' + route,
				payload: value.toString(),
				qos: 2
			}, null, callback);
		} catch (e) {
			console.error('Error publishing in route ' + route, e);
		}
	}

	/**
	 * Publica datos de forma periódica (cada every milisegundos) en la ruta que se
	 * especifique, va subiendo el valor publicado entre min y max (y vuelve a empezar).
	 * Cada vez que se publica el valor actual (parametro current) aumenta lo mismo que
	 * lo que vale "addition". Una vez llamada esta función recursiva no tiene condición
	 * de salida, publica datos data x milisegundos en la ruta indefinidamente.
	 *
	 * @param {int} every Publicar cada x milisegundos.
	 * @param {string} route Ruta (parte del topic) dónde publicar datos.
	 * @param {float} min Valor mínimo del rango del sensor en esta ruta.
	 * @param {float} max Valor máximo del rango del sensor en esta ruta.
	 * @param {float} addition  Valor que se añade a current por cada vez que se publican
	 * 							datos.
	 * @param {float} current Valor actual que vamos a publicar.
	 * @return {void} Nada
	 */
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

	/**
	 * Publica un valor booleano (cambia cada vez que se publica) cada every milisegundos.
	 *
	 * @param {int} every Publicar cada x milisegundos.
	 * @param {string} route Ruta (parte del topic) dónde publicar datos.
	 * @param {boolean} value Valor booleano 1 o 0.
	 * @return {void} Nada
	 */
	function publishBooleanInterval(every, route, value) {
		setTimeout(() => {
			publish(route, value, () => publishBooleanInterval(every, route, value === 1 ? 0 : 1));
		}, every + (Math.random() * 3000 * (value ? 1 : -1)));
	}

	// Pedir los rangos y si no están aun configurados decirlo por consola y acabar.
	RangesModel.getLast((err, ranges) => {
		if (err) {
			throw err;
		}

		if (!ranges) {
			throw new Error(`
				Para poder generar datos de prueba necesitas configurar los rangos de los
				sensores. Puedes hacerlo en /ranges.
			`);
		}

		if (!validateRanges(ranges)) {
			throw new Error(`
				Hay rangos sin configurar todavía. Para poder generar los datos de prueba
				han de estar todos los rangos configurados.
			`);
		}

		routesByRange.forEach(element => {
			// Cada conjunto de rutas se publica cada baseIntervalTime +2 -3 +1... ms para variar un poco.
			const every = baseIntervalTime + Math.random() * 10 - 5;
			let range;

			if (element.range.startsWith('ecu')) {
				const rangeKey = element.range.split('.')[1];
				range = ranges.ecu[rangeKey];
			} else {
				range = ranges[element.range];
			}

			// Old ranges no longer in use.
			if (!range) {
				return true;
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
		// publishBooleanInterval(5000, 'clutch', 1);
	});
};