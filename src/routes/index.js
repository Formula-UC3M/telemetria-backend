const routes = require('pillars').routes;
const main = require('./main');
const data = require('./data');
const users = require('./users');
const ranges = require('./ranges');

console.info('Añadiendo rutas al servidor.');
routes.add(data);
routes.add(users);
routes.add(ranges);
routes.add(main);