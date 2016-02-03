"use strict";

import angular from 'angular';
import Navbar from './navbar/navbar';

let commonModule = angular.module('medup.common', [
  Navbar.name
]);

export default commonModule;
