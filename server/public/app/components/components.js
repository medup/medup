"use strict";

import angular from 'angular';
import Dashboard from './dashboard/dashboard';
import Medications from './medications/medications';

let componentModule = angular.module('medup-web.components', [
  Dashboard.name,
  Medications.name
]);

export default componentModule;
