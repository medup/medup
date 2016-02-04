"use strict";

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import dashboardComponent from './dashboard.component';
import signinController from './dashboard.signin.controller';
import signupController from './dashboard.signup.controller';
import AuthFactory from './AuthFactory';



let dashboardModule = angular.module('dashboard', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider
      .state('dashboard', {
        template: '<dashboard></dashboard>'
      })
      .state('dashboard.splash', {
        url: '/',
        templateUrl: 'app/components/dashboard/dashboard.splash.html'
      })
      .state('dashboard.signin', {
        url: '/signin',
        templateUrl: 'app/components/dashboard/dashboard.auth.html',
        controller: signinController,
        controllerAs: 'vm'
      })
      .state('dashboard.signup', {
        url: '/signup',
        templateUrl: 'app/components/dashboard/dashboard.auth.html',
        controller: signupController,
        controllerAs: 'vm'
      });
   })
  .component('dashboard', dashboardComponent)
  .factory('AuthFactory', AuthFactory);

export default dashboardModule;
