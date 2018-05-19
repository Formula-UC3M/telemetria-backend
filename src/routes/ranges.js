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
		method: 'GET',
		useAuth: true
	},
	rangesController.getAll
));

ranges.routes.add(new Route(
	{
		id: 'ranges-between-dates',
		path: '/dates',
		method: 'GET',
		useAuth: true
	},
	rangesController.getBetweenDates
));

module.exports = ranges;
