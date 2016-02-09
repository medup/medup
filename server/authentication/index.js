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
  /* Register JSON Web Token auth strategy */
  plugin.auth.strategy('jwt', 'jwt', {
    key: process.env.tokenSecret,
    validateFunc: internals.validate,
    verifyOptions: {
      algorithms: ['HS256']
    }
  });

  next();
};

exports.register.attributes = {
  name: 'authentication'
};
