/* global Middleware */
const project = require('pillars');
const extra = require('./gw-extra');
const auth = require('./auth');

// Add middlewares.
project.middleware.add(new Middleware({ id: 'extra'}, extra));
project.middleware.add(new Middleware({ id: 'auth'}, auth));