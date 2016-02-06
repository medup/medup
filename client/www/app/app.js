/**
 *
 * Routing
 *
 */

(function() {
  'use strict';

  angular
    .module('medup', ['chart.js', 'ds.clock', 'ionic', 'ngCordova', 'nvd3', 'medup.auth', 'medup.calendar', 'medup.dashboard', 'medup.healthStats', 'medup.medications', 'medup.medsForm', 'medup.services'])
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
      $urlRouterProvider.otherwise('/dashboard/:user');
      $stateProvider
        .state('calendar', {
          url: '/calendar',
          templateUrl: 'app/calendar/calendar.html',
          controller: 'CalendarCtrl'
        })
        .state('dashboard', {
          url: '/dashboard/:user',
          templateUrl: 'app/dashboard/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .state('healthStats', {
          url: '/healthStats',
          templateUrl: 'app/healthStats/healthStats.html',
          controller: 'HealthStatsCtrl'
        })
        .state('medications', {
          url: '/medications',
          templateUrl: 'app/medications/medications.html',
          controller: 'MedicationsCtrl'
        })
        .state('medsForm', {
          url: '/medsForm/:medId',
          templateUrl: 'app/medsForm/medsForm.html',
          controller: 'MedsFormCtrl'
        })
        .state('register', {
          url: '/register',
          templateUrl: 'app/auth/register.html',
          controller: 'AuthCtrl'
        })
        .state('signin', {
          url: '/signin',
          templateUrl: 'app/auth/signin.html',
          controller: 'AuthCtrl'
        });

      // $httpProvider.interceptors.push('AttachTokens');
    })
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
    //     if (toState.name === 'signin' || toState.name === 'register') {
    //       return;
    //     }

    //     if (!AuthService.hasToken()) {
    //       e.preventDefault();
    //       $state.go('signin');
    //     }
    //   });
    // });
})();
