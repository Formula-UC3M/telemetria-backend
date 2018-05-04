const mosca = require('mosca');

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
	// Solo hacemos algo cuando se envia un mensaje al topic que a nosotros nos interesa.
	if (packet.topic === 'formula/realtime-data') {
		console.log(
			`Cliente ${ client && client.id } publicando los datos: `,
			packet.payload.toString());
	} else if (!packet.topic.toLowerCase().startsWith('$sys')) {
		console.log(
			`Cliente "${ client && client.id }" publicando datos en el topic
			"${ packet.topic }". Recuerda que el servidor mqqt trabaja con los mensajes 
			del topic "formula/realtime-data"`
		);
	}
});

// Evento que se dispara cuando un cliente se suscribe a un "topic"
moscaMQTTServer.on('subscribed', (topic, client) => {
	console.log(`Cliente ${ client && client.id } subscrito al topic ${ topic }`);
});

// Evento que se dispara cuando un cliente se desuscribe.
moscaMQTTServer.on('unsubscribed', (topic, client) => {
	console.log(`Cliente ${ client && client.id } desubscrito del topic ${ topic }`);
});

module.exports = moscaMQTTServer;