"use strict";

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import addMedicationComponent from './add-medication.component';
import addMedicationFactory from './add-medication.services';
import uiBootstrap from 'angular-ui-bootstrap';

let addMedicationModule = angular.module('addMedication', [
  uiRouter,
  uiBootstrap,
  'checklist-model'
])
  .config(($stateProvider) => {
    $stateProvider
      .state('addMedication', {
        url: '/add-medication',
        template: '<add-medication></add-medication>'
      })
  })
  .component('addMedication', addMedicationComponent)
  .factory('addMedicationFactory', addMedicationFactory);

export default addMedicationModule;
