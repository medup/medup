'use strict';
const Memory = require('sails-memory');

exports.register = (plugin, options, next) => {

  plugin.dependency('models');

  plugin.route({
    path: '/user/signin',
    method: 'POST',
    handler: require('./signin.handler')
  });

  plugin.route({
    path: '/user/signup',
    method: 'POST',
    handler: require('./signup.handler')
  });

  next();
};

exports.register.attributes = {
  name: 'users'
};
