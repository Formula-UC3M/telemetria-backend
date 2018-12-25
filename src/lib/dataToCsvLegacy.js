const Json2csvParser = require('json2csv').Parser;
const moment = require('moment');

const fields = [
	{
		label: 'Fecha y Hora',
		value: (row, field) => moment(new Date(Number(row.timestamp))).format('D-M-YYYY hh:mm:ss.SSS')
	},
	{
		label: 'Temperatura Agua',
		value: 'ecu.water_temp_eng'
	},
	{
		label: 'Temperatura Aceite',
		value: (row, field) => row.ecu.oil_tempEng || row.ecu.oil_temp_eng
	},
	{
		label: 'RPM',
		value: 'ecu.rpm'
	},
	{
		label: 'Velocidad',
		value: 'speed'
	},
	{
		label: 'Posición Acelerador',
		value: 'throttle_position'
	},
	{
		label: 'Posición Freno',
		value: 'brake_position'
	},
	{
		label: 'RDI Suspensión',
		value: 'wfl.suspension'
	},
	{
		label: 'RDI T. Freno',
		value: 'wfl.brake_temperature'
	},
	{
		label: 'RDD Suspensión',
		value: 'wfr.suspension'
	},
	{
		label: 'RDD T. Freno',
		value: 'wfr.brake_temperature'
	},
	{
		label: 'RTI Suspensión',
		value: 'wbl.suspension'
	},
	{
		label: 'RTI T. Freno',
		value: 'wbl.brake_temperature'
	},
	{
		label: 'RTD Suspensión',
		value: 'wbr.suspension'
	},
	{
		label: 'RTD T. Freno',
		value: 'wbr.brake_temperature'
	},
	{
		label: 'T. Radiador Entrada',
		value: 'radiator_temperature.sensor_1'
	},
	{
		label: 'T. Radiador Medio',
		value: 'radiator_temperature.sensor_2'
	},
	{
		label: 'T. Radiador Salida',
		value: 'radiator_temperature.sensor_3'
	},
	{
		label: 'Pitot',
		value: 'pitot'
	},
	{
		label: 'Dirección',
		value: 'direction'
	},
	{
		label: 'Upright T.',
		value: 'upright_temperature'
	},
	{
		label: 'Upleft T.',
		value: 'upleft_temperature'
	},
	{
		label: 'Clutch',
		value: 'clutch'
	},
	{
		label: 'Acelerometro 1',
		value: 'accelerometer.sensor_1'
	},
	{
		label: 'Acelerometro 2',
		value: 'accelerometer.sensor_2'
	},
	{
		label: 'Acelerometro 3',
		value: 'accelerometer.sensor_3'
	},
];

module.exports = function (data) {
	const json2csvParser = new Json2csvParser({ fields, delimiter: ';' });
	return json2csvParser.parse(data);
};