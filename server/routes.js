'use strict';

const Joi = require('joi');

const internals = {
  routeValidation: {
    signup: {
      payload: Joi.object().required().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
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
        id: Joi.number()
      }),
      payload: Joi.object().keys({
        info: Joi.object().keys({
          name: Joi.string(),
          instruct: Joi.string()
        }),
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
                                                        path: '.tmp' } } } },

    { method: 'POST', path: '/user/signup', config: { auth: false, handler: handlers['Users'].signup, validate: internals.routeValidation.signup } },
    { method: 'POST', path: '/user/signin', config: { auth: false, handler: handlers['Users'].signin, validate: internals.routeValidation.signin } },
    { method: 'GET', path: '/restricted', config: { auth: 'jwt', handler: handlers['Restricted'] } },
    { method: 'DELETE', path: '/api/medications/{id?}', config: { auth: 'jwt', handler: handlers['Medication'], validate: { params: Joi.object().keys({ id: Joi.number() }) } } },
    { method: '*', path: '/api/medications/{id?}', config: { auth: 'jwt', handler: handlers['Medication'], validate: internals.routeValidation.medication } },
  ]);

  next();
};

exports.register.attributes = {
  name: 'routes'
};