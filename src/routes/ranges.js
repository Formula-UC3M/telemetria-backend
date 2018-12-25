/* global Route */
const rangesController = require('../controllers/ranges');

const ranges = new Route(
	{
		id: 'api-ranges',
		path:'/api/ranges',
		method: ['GET', 'POST'],
		multipart: true,
		useAuth: true
	},
	gw => {
		if (gw.method === 'GET') {
			return rangesController.get(gw);
		}

		rangesController.create(gw);
	}
);

ranges.routes.add(new Route(
	{
		id: 'ranges-all',
		path: '/all',
		method: 'GET'
	},
	rangesController.getAll
));

ranges.routes.add(new Route(
	{
		id: 'ranges-between-dates',
		path: '/dates',
		method: 'GET'
	},
	rangesController.getBetweenDates
));

module.exports = ranges;
