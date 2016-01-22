'use strict';

const Memory = require('sails-memory');

exports.register = (plugin, options, next) => {

  plugin.dependency('models');

  plugin.route({
    path: '/api/medications',
    method: 'POST',
    handler: require('./medications.handler'),
    config: {
      auth: 'jwt'
    }
  });

  plugin.route({
    path: '/api/medications',
    method: 'GET',
    handler: require('./medications.handler'),
    config: {
      auth: 'jwt'
    }
  });

  next();

};

exports.register.attributes = {
  name: 'medications'
};
