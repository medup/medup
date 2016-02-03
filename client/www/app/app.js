/**
 *
 * Routing
 *
 */

(function() {
  'use strict';

  angular
    .module('starter', ['ionic', 'ngCordova', 'nvd3', 'chart.js', 'starter.dashboard', 'starter.main', 'starter.healthStats', 'starter.services', 'starter.auth', 'starter.medsForm'])
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
    .config(function(ChartJsProvider, $stateProvider, $urlRouterProvider, $compileProvider, $httpProvider) {
      $urlRouterProvider.otherwise('/healthStats');
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
        .state('main', {
          url: '/main',
          templateUrl: 'app/main/main.html',
          controller: 'MainCtrl'
        })
        .state('healthStats', {
          url: '/healthStats',
          templateUrl: 'app/healthStats/healthStats.html',
          controller: 'HealthStatsCtrl'
        })
        .state('medsForm', {
          url: '/medsForm/:medId',
          templateUrl: 'app/medsForm/medsForm.html',
          controller: 'MedsFormCtrl'
        });

      // $httpProvider.interceptors.push('AttachTokens');

      // Configure all charts
      ChartJsProvider.setOptions({
        colours: ['#F7464A', '#46BFBD'],
        responsive: true
      });
    });
  // .factory('AttachTokens', function($window) {
  //   var attach = {
  //     request: function(object) {
  //       var jwt = $window.localStorage.getItem('com.medUp');
  //       if (jwt) {
  //         object.headers['Authorization'] = jwt;
  //       }
  //       return object;
  //     }
  //   };
  //   return attach;
  // })
  // .run(function($rootScope, $state, AuthService) {
  //   $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
  //     if (toState.name === 'signin' || toState.name === 'signup') {
  //       return;
  //     }

  //     if (!AuthService.hasToken()) {
  //       e.preventDefault();
  //       $state.go('signin');
  //     }
  //   });
  // });
})();
