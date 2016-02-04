"use strict";

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import medicationsComponent from './medications.component';
import medicationsController from './medications.controller';


let medicationsModule = angular.module('medications', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider
      .state('viewMedication', {
          url: '/medications',
          templateUrl: 'app/components/medications/medications.html',
          controller: 'medicationsController',
          controllerAs: 'vm'
        });
   })
  .component('medicationsComponent', medicationsComponent);

export default medicationsModule;