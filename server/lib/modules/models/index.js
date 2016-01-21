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
        require('./user.model'),
        require('./medications.model')
      ]
    }
  }).then(err => {
    if (err) throw err;
  });

  next();
};

exports.register.attributes = {
  name: 'models'
};
