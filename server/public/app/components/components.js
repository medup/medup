"use strict";

import angular from 'angular';
import Dashboard from './dashboard/dashboard';
import AddMedication from './add-medication/add-medication';
import Medications from './medications/medications';
import EditMedication from './medications/edit-medication';

let componentModule = angular.module('medup-web.components', [
  Dashboard.name,
  Medications.name,
  AddMedication.name,
  EditMedication.name
]);

export default componentModule;
