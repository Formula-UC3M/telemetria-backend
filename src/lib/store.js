const DataModel = require('../models/data');

/**
 * Saves data in database every X miliseconds while something gets saved. Store the
 * data until .env.RESOLUTION miliseconds then save the model in the mongo database.
 */
module.exports = function store() {
	// Private attributes.
	let initialized = false;
	let data = null;
	let updated = false;

	// Private methods
	function restart() {
		data = new DataModel();
		updated = false;
	}
	
	function doSave() {
		if (updated) {
			data.timestamp = Date.now();
			data.save((err, result) => {
				if (err) {
					return console.error('Error saving data: ' + err);
				}
			});

			restart();
		}
	}

	// Public methods
	this.init = function() {
		if (initialized) {
			console.warn('Warning: Trying to initialized an already initialized store.');
			return this;
		}

		initialized = true;
		restart();
		setInterval(doSave, parseInt(process.env.RESOLUTION));
		return this;
	};

	this.save = function(route, value) {
		if (!initialized) {
			console.warn('Warning: Trying to save data where the store is not initialized.');
			return this;
		}

		if (typeof(route) !== 'string') {
			console.error('Invalid route: ', route);
			throw Error('Invalid route. It must be a string like \'a/k/p\'');
		}

		updated = true;
		const tree = route.split('/');
		let parent = data;
		
		for (let i = 0; i < tree.length; i++) {
			if (parent[tree[i]] === undefined) {
				throw Error('Invalid route. The route you\'re using is not in the list of valid data routes. Route: ' + route);
			}

			if (i < tree.length - 1) {
				parent = parent[tree[i]];
			} else {
				parent[tree[i]] = value;
			}
		}

		return this;
	};
};