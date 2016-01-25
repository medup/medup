'use strict';

exports.register = (plugin, options, next) => {

  plugin.dependency('models');
  plugin.dependency('controllers');

  let handlers = plugin.plugins.controllers.handlers;

  plugin.route([
    { method: 'POST', path: '/user/signup', config: { auth: false, handler: handlers['Users'].signup } },
    { method: 'POST', path: '/user/signin', config: { auth: false, handler: handlers['Users'].signin } },
    { method: 'GET', path: '/restricted', config: { auth: 'jwt', handler: handlers['Restricted'] } },
    { method: '*', path: '/api/medications/{id?}', config: { auth: 'jwt', handler: handlers['Medication'] } }
  ]);

  next();
};

exports.register.attributes = {
  name: 'routes'
};