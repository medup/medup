'use strict';

const internals = {};

internals.validate = (decoded, req, callback) => {
  if (decoded.valid) {
    return callback(null, true);
  } else {
    return callback(null, false);
  }
};

exports.register = (plugin, options, next) => {
  plugin.auth.strategy('jwt', 'jwt', {
    key: process.env.tokenSecret,
    validateFunc: internals.validate,
    verifyOptions: {
      algorithms: ['HS256']
    }
  });
  plugin.auth.default('jwt');

  plugin.route({
    path: '/user/signin',
    method: 'POST',
    handler: require('./signin'),
    config: { auth: false }
  });

  plugin.route({
    path: '/user/signup',
    method: 'POST',
    handler: require('./signup'),
    config: { auth: false }
  });

  plugin.route({
    path: '/restricted',
    method: 'GET',
    handler: require('./restricted.handler'),
    config: { auth: 'jwt' }
  });

  next();
};

exports.register.attributes = {
  name: 'authentication'
};
