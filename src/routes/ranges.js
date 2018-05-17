/* global Route */
// const rangesController = require('../controllers/ranges');
const rangesModel = require('../models/ranges');

const ranges = new Route(
	{
		id: 'ranges',
		path:'/ranges',
		method: 'GET'
	},
	gw => {
		rangesModel.getLast((err, ranges) => {
			if (err) {
				gw.error(500, Error(err));
			}

			if (!ranges) {
				ranges = Object.assign({}, new rangesModel());
			}

			gw.json(ranges, { deep: 0 });
		});
	}
);

module.exports = ranges;
