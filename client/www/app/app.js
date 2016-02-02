/**
 *
 * Routing
 *
 */

(function() {
  'use strict';

  angular
    .module('starter', ['ionic', 'ngCordova', 'starter.dashboard', 'starter.services', 'starter.auth', 'starter.medsForm'])
    .run(function($ionicPlatform, $rootScope) {
      $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
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
          url: '/medsForm/:medId',
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
        if (toState.name === 'signin' || toState.name === 'signup') {
          return;
        }

        if (!AuthService.hasToken()) {
          e.preventDefault();
          $state.go('signin');
        }
      });
    });
})();
