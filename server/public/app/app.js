"use strict";

  import angular from 'angular';
  import component from 'angular-component';
  import uiRouter from 'angular-ui-router';
  import AppComponent from './app.component';

  angular.module('medup-web', [
    uiRouter
  ])
    .config(($httpProvider) => {
        $httpProvider.interceptors.push('AttachTokens');
      })
      .component('medup-web', AppComponent)
      .factory('AttachTokens', attachTokens)
      .run(appRun);

function attachTokens($window) {

  let attach = {
    request: (object) => {

      let jwt = $window.localStorage.getItem('com.pillMeNow');

      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }

      object.headers['Allow-Control-Allow-Origin'] = '*';

      return object;

    }
  };

  return attach;

}

function appRun($rootScope, $state, Auth) {
  $rootScope.on('$stateChangeStart', (evt, toState) => {

    if (toState.name === 'signin') return;

    if (!Auth.isAuth() && toState.name !== 'signup') {
      evt.preventDefault();
      $state.go('signin');
    }
  });
}
