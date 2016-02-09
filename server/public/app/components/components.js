"use strict";

import angular from 'angular';
import Dashboard from './dashboard/dashboard';
import AddMedication from './add-medication/add-medication';
import Medications from './medications/medications';
import EditMedications from './edit-medication/edit-medication';

let componentModule = angular.module('medup-web.components', [
  Dashboard.name,
  Medications.name,
  AddMedication.name,
  EditMedications.name
]);

export default componentModule;
