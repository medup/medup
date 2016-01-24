'use strict';

const Plugo = require('plugo');

exports.register = (plugin, options, next) => {
  
  Plugo.expose({ name: 'handlers', path: __dirname + '/handlers' }, plugin, next);
};

exports.register.attributes = {
  name: 'controllers'
};