"use strict";

  import angular from 'angular';
  import uiRouter from 'angular-ui-router';
  import angularComponent from 'angular-component';
  import Common from './common/common';
  import Components from './components/components';
  import AppComponent from './app.component';


  angular.module('medup-web', [
    uiRouter,
    Common.name,
    Components.name
  ])
  .config(($httpProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('AttachTokens');
  })
  .component('medupWeb', AppComponent)
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
  .run(function($rootScope, $state, AuthFactory) {
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

      if (toState.name === 'dashboard.signin') {
        return;
      }

      if (!AuthFactory.hasToken()
          && toState.name !== 'dashboard.signin'
          && toState.name !== 'dashboard.signup'
          && toState.name !== 'dashboard.splash') {
        e.preventDefault();
        $state.go('dashboard.signin');
      }
    });
  });