/* global Route */
const dataModel = require('../models/data');
const store = require('../lib/store');
const storeObj = new store().init();

const dataRoute = new Route(
	{
		id: 'main-data',
		path: '/data',
		method: 'GET',
		useAuth: true
	},
	gw => {
		if (!gw.params.from || !gw.params.to) {
			gw.json({
				description: 'Guardado y carga de datos manual, sin usar mqtt.',
				rutas: {
					'/data/*:path': {
						GET: 'Devuelve el dato pedido si la "ruta" existe. Pj. /data/ecu/rpm',
						POST: 'Actualiza o guarda datos en la "ruta" si esta existe. Pj. /data/ecu/rpm/12000. La última parte es el valor.'
					},
					'/data?from=:timestamp&to=:timestamp': {
						GET: 'Devuelve todos los datos guardados entre "from" y "to". Pj. /data/ecu/rpm',
					}
				}
			});
		} else {
			dataModel.findByRange(gw.params.from, gw.params.to, (err, data) => {
				if (err) {
					gw.error(500, Error(err));
				}

				gw.json(data, {deep: 0});
			});
		}
	}
);

dataRoute.routes.add(new Route(
	{
		id: 'save-data',
		path: '/*:path',
		method: 'POST',
		useAuth: true
	},
	gw => {
		const last = gw.pathParams.path.lastIndexOf('/');
		const route = gw.pathParams.path.substring(0, last);
		const value = gw.pathParams.path.substring(last + 1);

		try {
			storeObj.save(route, value);
			gw.json({ route, value });
		} catch(e) {
			console.error('Error:' +  e.message);
			gw.error(400, e.message);
		}
	}
));

module.exports = dataRoute;