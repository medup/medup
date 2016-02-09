'use strict';

const crypto = require('crypto'),
      neat = require('node-neat'),
      path = require('path');

const internals = {};

module.exports = manifest => {

  /* Set port or use assigned */
  manifest.connections[0].port = internals.port;

  /* Static files relative paths */
  manifest.connections[0].routes.files = {
    relativeTo: __dirname + '/../'
  };

  /* Set random token secret */
  process.env.tokenSecret = crypto.randomBytes(16)
                                    .toString('base64');

  /* Configure Node-sass */
  let hapiSass = manifest.registrations.find(p => p.plugin.register === 'hapi-sass');
  if (hapiSass) {
    hapiSass.plugin.options = internals.sassOptions;
  }

  if (process.env.NODE_ENV !== 'production') {
    internals.localConfig(manifest);
  }
};

internals.port = process.env.PORT || 3000;

/* Node-sass options */
internals.sassOptions = {
  src: path.join(__dirname, '/../public/assets/sass'),
  dest: path.join(__dirname, '/../public/assets/css'),
  force: process.env.NODE_ENV === 'production' ? false : true,
  includePaths: neat.includePaths
};

/* Local development config */
internals.localConfig = (manifest) => {
  process.env.keySecret = crypto.randomBytes(16)
                                  .toString('base64');

  manifest.registrations.push({
    "plugin": {
      "register": "blipp"
    }
  });

  if (!process.env.NODE_ENV) {
    manifest.connections[0].host = 'localhost';
  }

  let good = manifest.registrations.find(p => p.plugin.register === 'good');
  if (good) {
    good.plugin.options.reporters[0].events['request'] = "*";
    good.plugin.options.reporters[0].events['log'] = null;
  }
};