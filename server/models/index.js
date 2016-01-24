'use strict';

const Plugo = require('plugo');

exports.register = (plugin, options, next) => {

  Plugo.expose({ name: 'schema', path: __dirname + '/schema' }, plugin, next);
};

exports.register.attributes = {
  name: 'models'
};