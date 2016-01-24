'use strict';

exports.register = (plugin, options, next) => {

  plugin.dependency('models');
  plugin.dependency('controllers');

  let handlers = plugin.plugins.controllers.handlers;

  plugin.route([
    { method: '*', path: '/api/medications', config: { auth: 'jwt', handler: handlers['Medication'] } }
  ]);

  next();
};

exports.register.attributes = {
  name: 'routes'
};