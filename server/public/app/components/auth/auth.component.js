import template from './auth.html';
import controller from './dashboard.signin.controller';
import controller from './dashboard.signup.controller';
// import styles';

let authComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default authComponent;