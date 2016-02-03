"use strict";

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import dashboardComponent from './dashboard.component';


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
        templateUrl: 'app/components/dashboard/dashboard.auth.html'
      })
      .state('dashboard.signup', {
        url: '/signup',
        templateUrl: 'app/components/dashboard/dashboard.auth.html'
      });  
   })     
  .component('dashboard', dashboardComponent);

export default dashboardModule;

