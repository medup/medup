//Todo: update
import DashboardController from './dashboard.controller';
import AuthServices from './AuthServices.js';

class SignupController extends DashboardController {
  constructor($state, AuthService) {
    super('ES6 inheritance with Angular');
    this.user = {};
    this.title = 'Sign Up';
    this.action = 'Sign Up';
 }
 submit() {
   AuthServices.signup(this.user)
   .then(data => {
     $state.go('dashboard')
   })
   .catch(data => {
     console.log("error") 
       
   });
 }
}

export default SignupController;