'use strict';

const crypto = require('crypto'),
      neat = require('node-neat'),
      path = require('path');

module.exports = manifest => {
  /* TODO refactor this */
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
    relativeTo: __dirname + '/../'
  };
  manifest.connections[0].port = process.env.PORT || 3000;

  let sassOptions = {
    src: path.join(__dirname, '/../public/assets/sass'),
    dest: path.join(__dirname, '/../public/assets/css'),
    force: true,
    includePaths: neat.includePaths
  };

  let hapiSass = manifest.registrations.find(p => p.plugin.register === 'hapi-sass');
  if (hapiSass) {
    hapiSass.plugin.options = sassOptions;
  }
};