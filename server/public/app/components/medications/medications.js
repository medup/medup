"use strict";

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import medicationsComponent from './medications.component';
import medicationsController from './medications.controller';
import MedFactory from '../MedFactory';

let medicationsModule = angular.module('medications', [uiRouter])
  .config(($stateProvider, $httpProvider) => {
    $stateProvider
      .state('medications', {
          url: '/medications',
          templateUrl: 'app/components/medications/view-medications.html',
          controller: medicationsController,
          controllerAs: 'vm'
        });
   })
  .component('medicationsComponent', medicationsComponent)
  .factory('MedFactory', MedFactory);

export default medicationsModule;