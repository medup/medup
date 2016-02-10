'use strict';

const Joi = require('joi');

const internals = {
  routeValidation: {
    signup: {
      payload: Joi.object().required().keys({
        email: Joi.string().required(),
        password: Joi.string().min(8).required()
      })
    },
    signin: {
      payload: Joi.object().required().keys({
        email: Joi.string().required(),
        password: Joi.string().min(8).required()
      })
    },
    medication: {
      params: Joi.object().keys({
        id: Joi.string()
      }),
      payload: Joi.object().keys({
        info: Joi.object().keys({
          name: Joi.string(),
          dose: Joi.number().integer().min(0).max(10000),
          instruct: Joi.string(),
	  time: Joi.string(),
	  unit: Joi.string().regex(oz|mg|mcg|g|fld)
        }),
        notifications: Joi.array(),
        taken: Joi.array()
      })
    }
  }
};

exports.register = (plugin, options, next) => {

  plugin.dependency('models');
  plugin.dependency('controllers');

  let handlers = plugin.plugins.controllers.handlers;

  plugin.route([
    { method: 'GET', path: '/', config: { auth: false, handler: (request, reply) => { reply.view('index'); } } },
    { method: 'GET', path: '/{param*}', config: { auth: false,
                                                    handler: {
                                                      directory: {
                                                        path: 'public' } } } },
    { method: 'POST', path: '/user/signup', config: { auth: false, handler: handlers['Users'].signup, validate: internals.routeValidation.signup } },
    { method: 'POST', path: '/user/signin', config: { auth: false, handler: handlers['Users'].signin, validate: internals.routeValidation.signin } },
    { method: 'GET', path: '/restricted', config: { auth: 'jwt', handler: handlers['Restricted'] } },
    { method: 'DELETE', path: '/api/medications/{id?}', config: { auth: 'jwt', handler: handlers['Medication'], validate: { params: Joi.object().keys({ id: Joi.string() }) } } },
    { method: 'GET', path: '/api/medications', config: { auth: 'jwt', handler: handlers['Medication'] } },
    { method: '*', path: '/api/medications/{id?}', config: { auth: 'jwt', handler: handlers['Medication'], validate: internals.routeValidation.medication } },
    { method: 'POST', path: '/api/log', config: { auth: 'jwt', handler: handlers['Log'].addLog } },
    { method: 'GET', path: '/api/log', config: { auth: 'jwt', handler: handlers['Log'].getLog } }
  ]);

  next();
};

exports.register.attributes = {
  name: 'routes'
};
