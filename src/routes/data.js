/* global Route */
const dataModel = require('../models/data');
const dataToCsv = require('../lib/dataToCsv');
const dataToCsvLegacy = require('../lib/dataToCsvLegacy');
const moment = require('moment');

const dataRoute = new Route(
	{
		id: 'main-data',
		path: '/data',
		method: 'GET',
		useAuth: true
	},
	gw => {
		if (!gw.params.all && !gw.params.from) {
			return gw.json({
				description: 'Rutas de obtención de datos.',
				rutas: {
					'/data?all=1': {
						GET: 'Devuelve todos los datos guardados en json.',
					},
					'/data?from=:timestamp': {
						GET: 'Devuelve todos los datos guardados desde "from" en formato json.',
					},
					'/data?from=:timestamp&to=:timestamp': {
						GET: 'Devuelve todos los datos guardados entre "from" y "to" en formato json.',
					},
					'/data/csv': {
						'GET, POST': 'Descarga un csv con todos los datos guardados en csv.',
					},
					'/data/csv?from=:timestamp': {
						'GET, POST': 'Descarga un csv con todos los datos guardados desde "from".',
					},
					'/data/csv?from=:timestamp&to=:timestamp': {
						'GET, POST': 'Descarga un csv con todos los datos guardados entre "from" y "to".',
					}
				}
			}, { deep: 0 });
		}

		if (gw.params.all) {
			return dataModel.find().exec((err, data) => {
				if (err) {
					gw.errorAsJson(500, err);
				}

				gw.json(data, {deep: 0});
			});
		}

		dataModel.findByRange(gw.params.from, gw.params.to, (err, data) => {
			if (err) {
				gw.errorAsJson(500, err);
			}

			gw.json(data, {deep: 0});
		});
	}
);

dataRoute.routes.add(new Route(
	{
		id: 'csv-data',
		path: '/csv',
		method: ['GET', 'POST'],
		useAuth: true
	},
	gw => {
		const now = moment(new Date()).format('D-M-YYYY hh:mm:ss');
		gw.setHeader('Content-disposition', `attachment; filename=formula-data-${ now }.csv`);
		gw.setHeader('Content-Type', 'text/csv');

		if (!gw.params.from) {
			return dataModel.find().exec((err, data) => {
				if (err) {
					gw.errorAsJson(500, err);
				}

				gw.send(dataToCsv(data), 'text/csv');
			});
		}

		dataModel.findByRange(gw.params.from, gw.params.to, (err, data) => {
			if (err) {
				gw.errorAsJson(500, err);
			}

			gw.send(dataToCsv(data), 'text/csv');
		});
	}
));

dataRoute.routes.add(new Route(
	{
		id: 'csv-data',
		path: '/csv-legacy',
		method: ['GET', 'POST'],
		useAuth: true
	},
	gw => {
		const now = moment(new Date()).format('D-M-YYYY hh:mm:ss');
		gw.setHeader('Content-disposition', `attachment; filename=formula-data-${ now }.csv`);
		gw.setHeader('Content-Type', 'text/csv');

		dataModel.find().exec((err, data) => {
			if (err) {
				gw.errorAsJson(500, err);
			}

			gw.send(dataToCsvLegacy(data), 'text/csv');
		});
	}
));

module.exports = dataRoute;