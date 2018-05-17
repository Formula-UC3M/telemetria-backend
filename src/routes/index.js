const routes = require('pillars').routes;
const main = require('./main');
const data = require('./data');
const users = require('./users');

console.info('Añadiendo rutas al servidor.');
routes.add(data);
routes.add(users);
routes.add(main);