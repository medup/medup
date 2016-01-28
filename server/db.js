'use strict';

const Mongo = require('sails-mongo');

exports.register = (plugin, options, next) => {

  plugin.dependency('models');

  let models = plugin.plugins.models.schema;

  plugin.register({
    register: require('dogwater'),
    options: {
      adapters: {
        mongo: Mongo
      },
      connections: {
        deploy: {
          adapter: 'mongo',
          url: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/medtest6'
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
