exports.config = {
          capabilities: {
            // You can use other browsers
            // like firefox, phantoms, safari, IE (-_-)
            'browserName': 'chrome' 
          },
          specs: [
            // We are going to make this file in a minute
            'login/login.spec.js',
            'dashboard/dashboard.spec.js',
            'medsForm/medsForm.spec.js',
            'register/register.spec.js'

          ],
          jasmineNodeOpts: {
             showColors: true,
             defaultTimeoutInterval: 30000,
             isVerbose: true,
          },
        allScriptsTimeout: 20000,
          onPrepare: function(){
            browser.driver.get('http://localhost:8100');
        }
};