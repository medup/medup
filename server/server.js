"use strict";

const Hapi = require('hapi'),
      Glue = require('glue'),
      manifest = require('./config/manifest.json'),
      crypto = require('crypto');


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

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) console.error('server.register err:', err);

  server.start(() => {
    console.log("Server is listening on", server.info.port);
  });
});
