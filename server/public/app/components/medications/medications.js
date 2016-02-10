"use strict";

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import medicationsComponent from './medications.component';
import medicationsController from './medications.controller';
import editMedicationController from './edit-medication.controller';
import MedFactory from '../MedFactory';

let medicationsModule = angular.module('medications', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider
      .state('viewMedications', {
          url: '/medications',
          templateUrl: '<medications><medications>',
          controller: medicationsController,
          controllerAs: 'vm'
        })
      .state('editMedication', {
          url: '/edit-medication',
          template: '<edit-medication></edit-medication>',
          controller: editMedicationController,
          controllerAs: 'vm'
      });
   })
  .component('medications', medicationsComponent)
  .factory('MedFactory', MedFactory);

export default medicationsModule;