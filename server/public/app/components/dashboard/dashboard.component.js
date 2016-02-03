'use strict';

import template from './dashboard.html';
import controller from './dashboard.controller';
import signinController from './dashboard.signin.controller';
import signupController from './dashboard.signup.controller';

let dashboardComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  signupController,
  signinController,
  controllerAs: 'vm'
};

export default dashboardComponent;
