'use strict';

let validate = (decoded, req, callback) => {
  if (decoded.valid) {
    return callback(null, true);
  } else {
    return callback(null, false);
  }
};

exports.register = (plugin, options, next) => {
  plugin.auth.strategy('jwt', 'jwt', {
    key: process.env.tokenSecret,
    validateFunc: validate,
    verifyOptions: {
      algorithms: ['HS256']
    }
  });
  plugin.auth.default('jwt');
  next();
};

exports.register.attributes = {
  name: 'auth'
};
