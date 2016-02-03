//Todo: update
import DashboardController from './dashboard.controller';
import AuthServices from './AuthServices.js';

class SigninController extends DashboardController {
  constructor($state, AuthService) {
    super('ES6 inheritance with Angular');
    this.user = {};
    this.title = 'Sign In';
    this.action = 'Sign In';
 }
 submit() {
  AuthServices.signin(this.user).then(data => $state.go('dashboard').catch(data => console.log("error")));
 }
}

export default SigninController;