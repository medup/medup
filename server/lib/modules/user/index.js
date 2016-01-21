exports.register = (plugin, options, next) => {

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