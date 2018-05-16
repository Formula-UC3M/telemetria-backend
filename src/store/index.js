const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const DataModel = require('./model');
const baseData = {
	timestamp: null,
	ecu: {
		water_temp_eng: null,
		oil_temp_eng: null,
		rpm: null,
	},
	wfl: {
		suspension: null,
		brake_temperature: null
	},
	wfr: {
		suspension: null,
		brake_temperature: null
	},
	wbl: {
		suspension: null,
		brake_temperature: null
	},
	wbr: {
		suspension: null,
		brake_temperature: null
	},
	radiator_temperature: {
		_1: null,
		_2: null,
		_3: null
	},
	pitot: null,
	direction: null,
	upright_temperature: null,
	upleft_temperature: null,
	throttle_position: null,
	brake_position: null,
	clutch: null,
	speed: null,
	accelerometer: {
		_1: null,
		_2: null,
		_3: null
	}
};

module.exports = function store() {
	// Private attributes.
	let initialized = false;
	let data = null;
	let updated = false;

	// Private methods
	function restart() {
		data = Object.assign(new DataModel(), baseData);
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
}
