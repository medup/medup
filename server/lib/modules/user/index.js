exports.register = (plugin, options, next) => {

  plugin.register({
    register: require('dogwater'),
    options: {
      adapters: {
        memory: 'sails-memory'
      },
      connections: {
        adapter: 'memory'
      },
      models: require('./user.model')
    }
  })

  plugin.route({
    path: '/user/create',
    method: 'POST',
    handler: require('./signup.handler')
  });

  next();
};

exports.register.attributes = {
  name: 'users'
};