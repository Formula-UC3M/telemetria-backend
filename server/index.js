// Cargando archivo de configuración .env.
console.info('Cargando archivos de configuración');
require('dotenv').config();

const project = require('pillars');
const moscaMQTTServer = require('./src/mqtt/mosca');

// Añadiendo rutas al servidor web.
console.info('Añadiendo rutas.');
require('./src/routes');

// Configurando servidor web (pillars).
const http = project.services.get('http');
// project.config.favicon = "favico.ico";
project.config.debug = process.env.DEBUG_MODE;
http.configure({
	host: process.env.HOST,
	port: parseInt(process.env.WEB_PORT)
});

// Enganchar un servicio http con pillars al servidor mqtt de mosca.
moscaMQTTServer.attachHttpServer(http.server);

// Evento que se lanza cuando el servidor mqtt está listo.
moscaMQTTServer.on('ready', () => {
	// Arrancar servidor web
	http.start();
	console.info(`Servidor corriendo en: http://${ process.env.HOST }:${ process.env.WEB_PORT }`);
});