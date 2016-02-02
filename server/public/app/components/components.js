"use strict";

import angular from 'angular';
import Dashboard from './dashboard/dashboard';

let componentModule = angular.module('medup-web.components', [
  Dashboard.name
]);

export default componentModule;
