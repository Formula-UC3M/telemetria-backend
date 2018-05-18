const RangesModel = require('../models/ranges');

function errorHandler(gw, error) {
	return error && gw.error(500, Error(error));
}

function parseDocument(data) {
	data = data._doc;
	data._id = String(data._id);
	return data;
}

function get(gw) {
	// By version
	if (gw.params.version) {
		RangesModel.getVersion(gw.params.version, (err, ranges) => {
			errorHandler(gw, err);
	
			if (!ranges) {
				return gw.error(500, Error('La versión de rangos que intentas obtener no existe en la base de datos.'));
			}
	
			gw.json(parseDocument(ranges), { deep: 0 });
		});
	} else if (gw.params.id) {
		// By id
		RangesModel.findOne({ _id: gw.params.id }, (err, ranges) => {
			errorHandler(gw, err);
			gw.json(parseDocument(ranges), { deep: 0 });
		});
	} else {
		// Default last saved version or default values.
		RangesModel.getLast((err, ranges) => {
			errorHandler(gw, err);
	
			if (!ranges) {
				ranges = Object.assign({}, new RangesModel()._doc);
				ranges._id = String(ranges._id);
				ranges.version = 1;
			} else {
				ranges = parseDocument(ranges);
			}
	
			gw.json(ranges, { deep: 0 });
		});
	}
}

function getAll(gw) {
	RangesModel.getAll((err, allRanges) => {
		errorHandler(gw, err);
		gw.json(allRanges, { deep: 0 });
	});
}

function getBetweenDates(gw) {
	if (gw.params.from && gw.params.to) {
		RangesModel.findByRange(gw.params.from, gw.params.to, (err, rangesArr) => {
			errorHandler(err);
			gw.json(rangesArr, { deep: 0 });
		});
	} else {
		if (!gw.params.from) {
			return gw.error(500, Error('Missing \'from\' date in get ranges versions between dates..'));
		}

		if (!gw.params.to) {
			return gw.error(500, Error('Missing \'to\' date in get ranges versions between dates..'));
		}
	}
}

function create(gw) {
	if (!gw.content.params || !Object.keys(gw.content.params).length) {
		return gw.json({
			code: 400,
			error: 'Error guardando rangos. No se han mandado datos para guardar.'
		});
	}

	RangesModel.create(gw.content.params, (err, data) => {
		if (err) {
			return gw.json({
				code: 500,
				error: 'Error guardando rangos. Mensaje: ' + err
			});
		}

		return gw.json({
			code: 200,
			data: parseDocument(data)
		});
	});
}

module.exports = {
	get,
	getAll,
	getBetweenDates,
	create
};