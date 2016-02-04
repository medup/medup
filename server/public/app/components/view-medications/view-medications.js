"use strict";

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import viewMedicationComponent from './view-medication.component';
import viewMedicationController from './view-medication.controller';


let viewMedicationModule = angular.module('viewMedication', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider
      .state('viewMedication', {
          url: '/medications',
          templateUrl: 'app/components/view-medication/view-medication.html',
          controller: 'viewMedicationController',
          controllerAs: 'vm'
        });
   })
  .component('viewMedicationComponent', viewMedicationComponent);

export default viewMedicationModule;