/* global Middleware */
const project = require('pillars');
const auth = require('./auth');

// Add middlewares.
project.middleware.add(new Middleware({ id: 'auth'}, auth));