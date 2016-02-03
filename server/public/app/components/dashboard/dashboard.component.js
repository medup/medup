'use strict';
//to do update
import template from './dashboard.html';
import DashboardController from './dashboard.controller';
import SigninController from '../auth/dashboard.signin.controller';
import SignupController from '../auth/dashboard.signup.controller';


let dashboardComponent = {
  restrict: 'E',
  bindings: {},
  template,
  DashboardController,
  SignupController,
  SigninController,
  controllerAs: 'vm'
};

export default dashboardComponent;
