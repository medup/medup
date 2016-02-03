import angular from 'angular';
import uiRouter from 'angular-ui-router';
import authComponent from './auth.component';

let authModule = angular.module('auth', [uiRouter])

.config(($stateProvider) => {
  $stateProvider
    .state('dashboard.signin', {
      url: '/signin',
      template: '<auth></auth>'
    })
    .state('dashboard.signup', {
      url: '/signup',
      template: '<auth></auth>'
    });
})

.component('auth', authComponent);

export default authModule;