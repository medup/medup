"use strict";

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import addMedicationComponent from './add-medication.component';

let addMedicationModule = angular.module('addMedication', [
  uiRouter
])
  .config(($stateProvider) => {
    $stateProvider
      .state('addMedication', {
        url: '/add-medication',
        template: '<add-medication></add-medication>'
      });
  })
  .component('addMedication', addMedicationComponent);

export default addMedicationModule;
