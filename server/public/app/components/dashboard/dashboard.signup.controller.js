"use strict";

// import AuthServices from './AuthServices';

class SignupController {
  constructor($state, $scope) {
    this.scope = $scope;
    this.scope.user = {};
    this.scope.title = 'Sign Up';
    this.scope.action = 'Sign Up';
    this.state = $state;
 }
 submit() {
   console.log('success');
  //  AuthServices.signup(this.user)
  //  .then(data => {
  //    this.state.go('dashboard');
  //    console.log('success');
  //  })
  //  .catch(data => {
  //    console.log("error");
  //  });
 }
}

export default SignupController;
