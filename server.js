// Cargando archivo de configuración .env.
console.info('Cargando archivos de configuración');
require('dotenv').config();

const project = require('pillars');
const mongoose = require('mongoose');
const jade = require('jade');
const moscaMQTTServer = require('./src/lib/mqtt/mosca');

console.info('Añadiendo rutas');
require('./src/routes');

console.info('Añadiendo middlewares.');
require('./src/middlewares');

// Configurando servidor web (pillars).
const http = project.services.get('http');
project.config.favicon = './src/resources/img/favico.ico';
project.config.debug = process.env.DEBUG_MODE;
http.configure({
	host: process.env.HOST,
	port: parseInt(process.env.WEB_PORT)
});

// Enganchar un servicio http con pillars al servidor mqtt de mosca.
moscaMQTTServer.attachHttpServer(http.server);

// Evento que se lanza cuando el servidor mqtt está listo.
console.info('Arrancando servidor MQTT...');
moscaMQTTServer.on('ready', () => {
	console.info('Servidor MQTT con Mosca js listo.');
	console.info('Conectando con MongoDB...');
	mongoose.connect(process.env.MONGODB_URI, err => {
		if (err) {
			throw new Error(`Error intentando conectarse a la base de dator: ${err}`);
		}

		console.info('Conectado a base de datos.');
		console.info('Arrancando servidor web...');
		http.start();
		console.info(`Servidor corriendo en: http://${ process.env.HOST }:${ process.env.WEB_PORT }`);

		// Configurar motor de plantillas
		global.templated.addEngine('jade', function compiler(source, path) {
			return jade.compile(source, {
				filename: path,
				pretty: false,
				debug: false,
				compileDebug: false
			});
		});
	});
});