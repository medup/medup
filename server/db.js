'use strict';

const Mongo = require('sails-mongo');
const Memory = require('sails-memory');

const internals = {};

exports.register = (plugin, options, next) => {

  plugin.dependency('models');

  let models = plugin.plugins.models.schema;

  plugin.register({
    register: require('dogwater'),
    options: {
      adapters: {
        mongo: Mongo,
        memory: Memory
      },
      connections: process.env.NODE_ENV ? internals.deploy : internals.local,
      models: [
        models.User,
        models.Medication,
        models.Log
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

/* Use memory adapter if !NODE_ENV */
internals.local = {
  deploy: {
    adapter: 'memory',
  }
};

/* Use MongoDB adapter if NODE_ENV */
internals.deploy = {
  deploy: {
    adapter: 'mongo',
    url: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/medtest6'
  }
};
