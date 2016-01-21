'use strict';

let validate = (decoded, req, callback) => {
  console.log('decoded', decoded);
  return callback(null, true);
};

exports.register = (plugin, options, next) => {
  plugin.auth.strategy('jwt', 'jwt', {
    key: process.env.tokenSecret || "bumblebee",
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
