/**
 *
 * Routing
 *
 */

(function() {
  'use strict';

  angular
    .module('starter', ['ionic', 'starter.dashboard', 'starter.services', 'starter.auth', 'starter.medsForm'])
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
      $urlRouterProvider.otherwise('/signin');
      $stateProvider
        .state('dashboard', {
          url: '/dashboard/:user',
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
          var jwt = $window.localStorage.getItem('com.medUp');
          if (jwt) {
            object.headers['Authorization'] = jwt;
          }
          return object;
        }
      };
      return attach;
    })
    .run(function($rootScope, $state, AuthService) {
      $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

        if (toState.name === 'login' || toState.name === 'register') {
          return;
        }

        if (!AuthService.hasToken()) {
          e.preventDefault();
          $state.go('login');
        }
      });
    });
})();
