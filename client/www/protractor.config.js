exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:8100',
  capabilities: {
    // You can use other browsers
    // like firefox, phantoms, safari, IE (-_-)
    'browserName': 'chrome'
  },
  specs: [
    // We are going to make this file in a minute
    'test/e2e/*.spec.js'
  ],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true,
  },
  allScriptsTimeout: 20000,
  mocks: {
    dir: 'mocks',
    default: ['medications']
  },
  onPrepare: function() {
    browser.driver.get('http://localhost:8100');
    require('protractor-http-mock').config = {
      rootDirectory: __dirname, // default value: process.cwd()
      protractorConfig: 'protractor.config.js' // default value: 'protractor.conf'
    };
  }
};
