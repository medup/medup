'use strict';

const Memory = require('sails-memory');

exports.register = (plugin, options, next) => {

  plugin.register({
    register: require('dogwater'),
    options: {
      adapters: {
        memory: Memory
      },
      connections: {
        local: {
          adapter: 'memory'
        }
      },
      models: [
        require('./medications.model')
      ]
    }
  }).then(err => {
    if (err) console.error(err);
  });

  plugin.route({
    path: '/api/medications',
    method: 'POST',
    handler: require('./medications.handler')
  });

  plugin.route({
    path: '/api/medications',
    method: 'GET',
    handler: require('./medications.handler')
  });
  next();
};

exports.register.attributes = {
  name: 'medications'
};
