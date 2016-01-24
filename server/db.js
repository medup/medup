'use strict';

const Memory = require('sails-memory');

exports.register = (plugin, options, next) => {

  plugin.dependency('models');

  let models = plugin.plugins.models.schema;

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
        models.User,
        models.Medication
      ]
    }
  }).then(err => {
    if (err) throw err;
  });

  next();
};

exports.register.attributes = {
  name: 'db'
};
