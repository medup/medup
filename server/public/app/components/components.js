"use strict";

import angular from 'angular';
import Dashboard from './dashboard/dashboard';
import Auth from './auth/auth';

let componentModule = angular.module('medup-web.components', [
  Dashboard.name,
  Auth.name
]);

export default componentModule;
