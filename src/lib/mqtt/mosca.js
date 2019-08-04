const mosca = require('mosca');
const store = require("../store");
const storeObj = new store().init();

// Configurar mosca conectado a mongodb
const settings = {
	port: parseInt(process.env.MQTT_PORT),
	backend: {
		type: 'mongo',
		url: process.env.MONGODB_URI,
		pubsubCollection: 'formula_rt',
		mongo: {}
	}
};

const moscaMQTTServer = new mosca.Server(settings);

moscaMQTTServer.on('clientConnected', client => {
	console.log('Cliente conectado: ', client.id);
});

moscaMQTTServer.on('clientDisconnected', client => {
	console.log('Cliente desconectado: ', client.id);
});

// Evento que se dispara cuando se publica un mensaje en la cola.
moscaMQTTServer.on('published', (packet, client) => {
	if (!client) {
		return;
	}

	// Solo hacemos algo cuando se envia un mensaje al topic que a nosotros nos interesa.
	const lowerCSTopicName = packet.topic.toLowerCase();
	if (!lowerCSTopicName.startsWith('$sys') && !lowerCSTopicName.startsWith('fake')) {
		const first = packet.topic.indexOf('/');
		const route = packet.topic.substring(first + 1);

		try {
			storeObj.save(route, packet.payload);
		} catch(e) {
			console.error('Error:' +  e.message);
		}
	}
});

// Evento que se dispara cuando un cliente se suscribe a un "topic"
moscaMQTTServer.on('subscribed', (topic, client) => {
	console.log(`Cliente ${ client && client.id } suscrito al topic ${ topic }`);
});

// Evento que se dispara cuando un cliente se desuscribe.
moscaMQTTServer.on('unsubscribed', (topic, client) => {
	console.log(`Cliente ${ client && client.id } desuscrito del topic ${ topic }`);
});

module.exports = moscaMQTTServer;