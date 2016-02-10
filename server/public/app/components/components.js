"use strict";

import angular from 'angular';
import Dashboard from './dashboard/dashboard';
import AddMedication from './add-medication/add-medication';
import Medications from './medications/medications';

let componentModule = angular.module('medup-web.components', [
  Dashboard.name,
  Medications.name,
  AddMedication.name
]);

export default componentModule;
