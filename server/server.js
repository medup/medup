"use strict";

const Hapi = require('hapi'),
      Glue = require('glue'),
      manifest = require('./config/manifest.json'),
      crypto = require('crypto');


if (!process.env.NODE_ENV) {
  manifest.connections[0].host = 'localhost';
}

if (process.env.NODE_ENV !== 'production') {
  process.env.tokenSecret = crypto.randomBytes(16)
                                  .toString('base64');
  process.env.keySecret = crypto.randomBytes(16)
                                  .toString('base64');

  manifest.registrations.push({
    "plugin": {
      "register": "blipp"
    }
  });

  let good = manifest.registrations.find(p => p.plugin.register === 'good');
  if (good) {
    good.plugin.options.reporters[0].events['request'] = "*";
    good.plugin.options.reporters[0].events['log'] = null;
  }
}

manifest.connections[0].routes.files = {
  relativeTo: __dirname + '/public'
};
manifest.connections[0].port = process.env.PORT || 3000;

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) console.error('server.register err:', err);

  if (process.env.NODE_ENV === 'production') {
    server.ext('onRequest', (request, reply) => {
      if (request.headers['x-forward-proto'] === 'http') {
        return reply('Forwarding to https')
          .redirect('https://' + request.headers.host + request.path)
          .code(301);
      }
      reply.continue();
    });
  }

  console.log(__dirname);

  server.views({
    engines: { ejs: require('ejs') },
    relativeTo: __dirname,
    path: 'public'
  })

  server.start(() => {
    console.log("Server is listening on", server.info.host);
  });
});
