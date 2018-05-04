/*global Route */
const routes = require('pillars').routes;
const paths = require('path');
const store = require("../store");


const saveSpecificDataRoute = new Route(
  {
	path: '/save/:source/:key/:value',
	method:["GET"]
  },
  gw => {
    store(gw.pathParams['source'],gw.pathParams['key'],gw.pathParams['value'])
    gw.send(
      'source: ' +
        gw.pathParams['source'] +
        ', key: ' +
        gw.pathParams['key'] +
        ', value: ' +
        gw.pathParams['value']
    );
  }
);
routes.add(saveSpecificDataRoute);

// Static Files and main route

const mainRoute = new Route(
  {
    id: 'main',
    path: '/',
    method: 'GET',
    session: true,
  },
  gw => {
    gw.file('./src/public/index.html');
  }
);
var pillarsDocsStatic = new Route({
  id: 'pillarsDocsStatic',
  path: '/*:path',
  directory: {
    path: paths.resolve(__dirname, '../public'),
    listing: true,
  },
});
mainRoute.routes.add(pillarsDocsStatic);

// Add routes to the server
console.info('Añadiendo rutas al servidor.');
routes.add(mainRoute);
