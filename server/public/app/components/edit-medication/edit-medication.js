"use strict";

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import editMedicationComponent from './edit-medication.component';
import editMedicationFactory from './edit-medication.services';
import uiBootstrap from 'angular-ui-bootstrap';

let editMedicationModule = angular.module('editMedication', [
  uiRouter,
  uiBootstrap,
  'checklist-model'
])
  .config(($stateProvider) => {
    $stateProvider
      .state('editMedication', {
        url: '/edit-medication',
        template: '<edit-medication></edit-medication>'
      })
  })
  .component('editMedicationComponent', editMedicationComponent)
  .factory('editMedicationFactory', editMedicationFactory);

export default editMedicationModule;
