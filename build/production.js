/**
 *
 * Routing
 *
 */

(function() {
  'use strict';

  angular
      .module('starter', ['ionic', 'starter.dashboard', 'starter.services','starter.auth', 'starter.medsForm'])
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })
    .config(function($stateProvider, $urlRouterProvider, $compileProvider, $httpProvider) {
      $urlRouterProvider.otherwise('/dashboard');
      $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/dashboard/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .state('signin', {
          url: '/signin',
          templateUrl: 'app/auth/signin.html',
          controller: 'AuthCtrl'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: 'app/auth/signup.html',
          controller: 'AuthCtrl'
        })
        .state('medsForm', {
          url: '/medsForm/:medName',
          templateUrl: 'app/medsForm/medsForm.html',
          controller: 'MedsFormCtrl'
        });

        $httpProvider.interceptors.push('AttachTokens');
    })
    .factory('AttachTokens', function($window) {
      var attach = {
        request: function(object) {
          var jwt = $window.localStorage.getItem('com.pillMeNow');
          if (jwt) {
            object.headers['authorization'] = jwt;
            console.log("obj", object);
          }
          return object;
        }
      };
      return attach;
    })
    // .run(function($rootScope, $state, AuthService) {
    //   $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

    //     if (toState.name === 'login' || toState.name === 'register') {
    //       return;
    //     }

    //     if (!AuthService.hasToken()) {
    //       e.preventDefault();
    //       $state.go('login');
    //     }
    //   });
    // });
})();

/**
 *
 * Handles requests made to server via $http
 *
 */

(function() {
  'use strict';

  angular
    .module('starter.services', [])
    .service('AuthService', AuthService)
    .service('MedService', MedService)
    .factory('Medications', Medications);
   
  AuthService.$inject = ['$window', '$state', '$http'];
  MedService.$inject = ['$state', '$http'];
  Medications.$inject = ['MedService'];
  
  function AuthService($window, $state, $http) {
    this.hasToken = function() {
      return !!$window.localStorage.getItem('com.pillMeNow');
    };

    this.signin = function(user) {
      return $http({
          method: 'POST',
          url: 'http://localhost:3003/user/signin',
          data: user
        })
        .then(function(response) {
          $window.localStorage.setItem('com.pillMeNow', response.data.token);
          //return response.data.token;
        });
    };

    this.signup = function(user) {
      return $http({
          method: 'POST',
          url: 'http://localhost:3003/user/signup',
          data: user
        })
        .then(function(response) {
          $window.localStorage.setItem('com.pillMeNow', response.data.token);
          //return response.data.token;
        });
    };

    this.signout = function() {
      $window.localStorage.removeItem('com.pillMeNow');
      $state.go('/signin');
    };
  }

  function MedService($state, $http) {
    this.getMeds = function(user) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3003/api/medications',
          data: user
        })
        .then(function(response) {
          return response.data;
        }, function(err) {
          return err;
        });
    };

    this.updateMeds = function(user) {
      return $http({
          method: 'PUT',
          url: 'http://localhost:3003/api/medications',
          data: user
        })
        .then(function(response) {
          return response.data;
        }, function(err) {
          return err;
        });
    };

    this.deleteMeds = function(user) {
      return $http({
          method: 'DELETE',
          url: 'http://localhost:3003/api/medications',
          data: user
        })
        .then(function(response) {
          return response.data;
        }, function(err) {
          return err;
        });
    };
  }

  function Medications() {
    var  medFac = {};
    medFac.userMeds = {};
    // MedService.getMeds(user)
    //   .then(function(medInfoArr) {
    //     medFac.userMeds.dbMeds = medInfoArray;
    //   }).catch(function(medInfoArr) {
    //     console.log("ERROR: User Medications not Received");
    //   });
    
    var testMeds = [{
      id: 12,
      name: "Abilify (Aripiprazole)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 123,
      name: "Actiq (Fentanyl Citrate)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 1234,
      name: "Halcion (Triazolam)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 12345,
      name: "Quinidex (Quinidine)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 123456,
      name: "Adderall (Amphetamine)",
      dosage: "10mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }];
    
    medFac.userMeds.localMeds = testMeds;
    return medFac;
  };
  
})();

(function() {
  'use strict';

  angular
    .module('starter.dashboard', ['ionic', 'ionic-material'])
    .controller('DashboardCtrl', DashboardCtrl);
  DashboardCtrl.$inject = ['$scope', '$state', '$ionicModal', '$timeout', 'MedService'];

  function DashboardCtrl($scope, $state, $ionicModal, $timeout, MedService) {

    $ionicModal.fromTemplateUrl('app/dashboard/more-information.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    /* Get med data when user enters dashboard */
    var getMedData = function(user) {
      MedService.getMeds(user)
        .success(function(medInfoArr) {
          $scope.medications = medInfoArr;
        }).error(function(medInfoArr) {
          console.log("Error Retrieving Information");
        });
    };

    // getMedData();
    $scope.editMedication = function(medication) {
      $state.go('medsForm', {medName: medication.id});
      /**

        TODO:
        - route to medsForm state passing in the information for placeholder
        - should update the database when information is edited and reflect on dashboard
        - should route to dashboard when editing is complete
        - should be able to add multiple alarms on medForm for that medication

       */

    };

    $scope.moreInformation = function(e, medication) {
      $scope.medication = medication;
      $scope.modal.show();
    };

    $scope.removeReminder = function(medication) {
      var index = $scope.medications.indexOf(medication);
      $scope.medications.splice(index, 1);
      /**

        TODO:
        - remove reminder from database

       */
    };

    /**
    /* Fake data to test dashboard */
    $scope.medications = [{
      id: 12,
      name: "Abilify (Aripiprazole)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 123,
      name: "Actiq (Fentanyl Citrate)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 1234,
      name: "Halcion (Triazolam)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 12345,
      name: "Quinidex (Quinidine)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 123456,
      name: "Adderall (Amphetamine)",
      dosage: "10mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }];
  }
})();

(function() {
  'use strict';
  /**
   * app name : starter
   * AuthService dependency is defined in the services.js file
   * $ionicPopup dependency for a simple popup
   * $state for the transition to the next view
   */
  angular
    .module('starter.auth', [])
    .controller('AuthCtrl', AuthCtrl);
  AuthCtrl.$inject = ['$scope', '$state', '$ionicPopup', 'AuthService'];

  function AuthCtrl($scope, $state, $ionicPopup, AuthService) {
    $scope.data = {};

    $scope.signin = function() {
      AuthService.signin($scope.data)
        .then(function(data) {
          $state.go('dashboard');
        }).catch(function(data) {
          console.log(data);
          var alertPopup = $ionicPopup.alert({
            title: 'Login Failed',
            template: 'Please Check your credentials!'
          });
        });
    };

    $scope.signup = function() {
      console.log("Signup - Scope data " + $scope.data);
     AuthService.signup($scope.data)
        .then(function(data) {
          $state.go('dashboard');
        }).catch(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Register Failed',
            template: 'Please Check your credentials!'
          });
        });
    };
  }
})();
(function () {
  'use strict';

  angular
      .module('starter.medsForm', ['ionic', 'ionic-material'])
      .controller('MedsFormCtrl', MedsFormCtrl);
  MedsFormCtrl.$inject = ['$scope', '$state', '$stateParams', 'MedService', 'Medications'];

  function MedsFormCtrl($scope, $state, $stateParams, MedService, Medications) {
    $scope.medId = $stateParams.medName;
    $scope.userMeds = Medications.userMeds;
    $scope.userMeds.localMeds.forEach(function (medication) {
      if (medication.id === parseInt($scope.medId)) $scope.med = medication;
    });

    $scope.saveMed = function () {
      console.log('save med');
    };
  };
})();

'use strict';

const CryptoJS = require('crypto-js');

let internals = {
  'get': (request, reply) => {
    let User = request.collections.users,
        userId = request.auth.credentials.id;

    User.findOne({ id: userId })
        .populate('medications')
        .exec(function(err, user) { 
          if (err) console.error(err);

          if (user) {
            let data = user.medications.map(med => {
              let decryptedText = CryptoJS.AES.decrypt(med.info.toString(), process.env.keySecret);

              return {
                id: med.id,
                owner: med.owner,
                info: JSON.parse(decryptedText.toString(CryptoJS.enc.Utf8))
              };
            });

            return reply(data).code(200);
          }

          return reply().code(404);
        });
  },
  'post': (request, reply) => {
    let Medications = request.collections.medications;
    let medication = request.payload;

    let encryptedInfo = CryptoJS.AES.encrypt(JSON.stringify(medication.info), process.env.keySecret);

    Medications.create({
      info: encryptedInfo.toString(),
      owner: request.auth.credentials.id
    }).exec(function(err, med) {
      if (err) console.error(err);

      return reply().code(201);
    });
  },
  'put': (request, reply) => {

    let Medications = request.collections.medications;
    let medication = request.payload;
    let medicationId = request.params.id;

    Medications.findOne({id: medicationId})
      .exec((err, med) => {

        if (err) console.error(err);

        if (med.owner !== request.auth.credentials.id) {
          return reply().code(401);
        }

        if (medication.taken) {
          med.taken = medication.taken;
          med.save((err, saved) => {

            if (err) console.error(err);

            if (saved) {
              return reply().code(200);
            }

            return reply().code(404);

          });
        } else {

          let encryptedInfo = CryptoJS.AES.encrypt(JSON.stringify(medication.info), process.env.keySecret);

          med.info = encryptedInfo.toString();
          med.save((err, saved) => {

            if (err) console.error(err);

            if (saved) {
              return reply().code(200);
            }

            return reply().code(404);

          });
        }
    });
  },
  'delete': (request, reply) => {

    let Medications = request.collections.medications;
    let medId = request.params.id;

    Medications.findOne({id: medId})
      .exec((err, med) => {

        if (err) console.error(err);

        if (med.owner !== request.auth.credentials.id) {
          return reply().code(401);
        }

        Medications.destroy({id: medId}).exec((err) => {

          if (err) {
            console.error(err);
            return reply().code(404);
          }

          return reply().code(200);

        });
      });
    }
};

module.exports = (request, reply) => {
  internals[request.method](request, reply);
};

'use strict';

module.exports = (request, reply) => {
  return reply('Valid token');
};
'use strict';

const internals = {};

internals.signup = (request, reply) => {
  
  let User = request.collections.users;
  let newUser = request.payload;

  User.findOne({ email: newUser.email })
      .exec(function(err, user) {
        if (err) console.error(err);

        if (user) {
          return reply('User already exists').code(409);
        }

        let salt = User.generateSalt();

        User.hashPassword(newUser.password, hash => {
          User.create({
            email: newUser.email,
            password: hash,
            salt: salt
          }).exec((err, user) => {
            if (err) console.error(err);

            User.generateKey(newUser.password, user.salt, key => {

              let session = {
                id: user.id,
                valid: true
              };

              User.signToken(session, (token) => {
                return reply({ token: token }).code(201);
              });
            });
          });
        });
      });
};

internals.signin = (request, reply) => {
  let User = request.collections.users;
  let requestUser = request.payload;

  User.findOne({ email: requestUser.email })
      .exec(function(err, user) {
        if (err) console.error(err);

        if (user) {
          User.comparePassword(requestUser.password, user.password, (res) => {
            if (!res) return reply('Invalid password').code(401);

            User.generateKey(requestUser.password, user.salt, key => {

              let session = {
                id: user.id,
                valid: true
              };

              User.signToken(session, (token) => {
                return reply({ token: token }).code(200);
              });
            });
          });
        } else {
          return reply().code(404);
        }
      });
};

module.exports = {
  signup: internals.signup,
  signin: internals.signin
};
'use strict';

module.exports = {
  tableName: 'medications',
  connection: 'deploy',
  attributes: {
    info: 'string',
    taken: 'array',
    owner: {
      model: 'users'
    }
  }
};
'use strict';

const crypto = require('crypto'),
      bcrypt = require('bcrypt-nodejs'),
      JWT = require('jsonwebtoken');

module.exports = {
  tableName: 'users',
  connection: 'deploy',
  attributes: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    salt: {
      type: 'string'
    },
    medications: {
      collection: 'medications',
      via: 'owner'
    }
  },
  hashPassword(password, callback) {
    bcrypt.hash(password, null, null, (err, hash) => {
      callback(hash);
    });
  },
  comparePassword(password, hash, callback) {
    bcrypt.compare(password, hash, (err, res) => {
      callback(res);
    });
  },
  generateSalt() {
    return crypto.randomBytes(32).toString('base64');
  },
  generateKey(password, salt, callback) {
    crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, key) => {
      callback(key);
    });
  },
  signToken(session, callback) {
    JWT.sign(session, process.env.tokenSecret, { algorithm: 'HS256' }, (token) => {
      callback(token);
    });
  }
};

'use strict';

const Mongo = require('sails-mongo');

exports.register = (plugin, options, next) => {

  plugin.dependency('models');

  let models = plugin.plugins.models.schema;

  plugin.register({
    register: require('dogwater'),
    options: {
      adapters: {
        mongo: Mongo
      },
      connections: {
        deploy: {
          adapter: 'mongo',
          url: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/medtest6'
        }
      },
      models: [
        models.User,
        models.Medication
      ]
    }
  }).then(err => {
    if (err) throw err;
  });

  next();
};

exports.register.attributes = {
  name: 'db'
};

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

  server.start(() => {
    console.log("Server is listening on", server.info.host);
  });
});

'use strict';

const Plugo = require('plugo');

exports.register = (plugin, options, next) => {
  
  Plugo.expose({ name: 'handlers', path: __dirname + '/handlers' }, plugin, next);
};

exports.register.attributes = {
  name: 'controllers'
};
module.exports = {

};
'use strict';

const internals = {};

internals.validate = (decoded, req, callback) => {
  if (decoded.valid) {
    return callback(null, true);
  } else {
    return callback(null, false);
  }
};

exports.register = (plugin, options, next) => {
  plugin.auth.strategy('jwt', 'jwt', {
    key: process.env.tokenSecret,
    validateFunc: internals.validate,
    verifyOptions: {
      algorithms: ['HS256']
    }
  });
  plugin.auth.default('jwt');

  next();
};

exports.register.attributes = {
  name: 'authentication'
};

'use strict';

const Plugo = require('plugo');

exports.register = (plugin, options, next) => {

  Plugo.expose({ name: 'schema', path: __dirname + '/schema' }, plugin, next);
};

exports.register.attributes = {
  name: 'models'
};