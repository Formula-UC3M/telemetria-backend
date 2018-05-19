// Fake data generator
const faker = function(moscaMQTTServer, everyMs) {
	function publish() {
		moscaMQTTServer.publish({
			topic: 'formula/realtime-fake-data',
			payload: JSON.stringify({
				date: new Date()
			}),
			qos: 1
		}, null, function done() {});
	}

	setInterval(publish, everyMs);
};

module.exports = faker;