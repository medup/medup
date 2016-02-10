"use strict";

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import editMedicationComponent from './edit-medication.component';
import editMedicationController from './edit-medication.controller';
import MedFactory from '../MedFactory';
import uiBootstrap from 'angular-ui-bootstrap';

let editMedicationModule = angular.module('editMedication', [uiRouter, uiBootstrap])
  .config(($stateProvider) => {
    $stateProvider
      .state('editMedication', {
          url: '/edit-medication',
          templateUrl: 'app/components/medications/edit-medication.html',
          controller: editMedicationController,
          controllerAs: 'vm'
      });
   })
  .component('editMedicationComponent', editMedicationComponent)
  .factory('MedFactory', MedFactory);

export default editMedicationModule;