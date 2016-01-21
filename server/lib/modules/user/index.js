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
        require('./user.model')
      ]
    }
  }).then(err => {
    if (err) console.error(err);
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
