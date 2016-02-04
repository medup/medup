"use strict";

class SignupController {
  constructor($state, $scope, AuthFactory) {
    this.scope = $scope;
    this.scope.AuthFactory = AuthFactory;
    this.scope.user = {};
    this.scope.title = 'Sign Up';
    this.scope.action = 'Sign Up';
    this.scope.submit = this.submit;
    this.scope.state = $state;

 }
 submit() {
   this.AuthFactory.signup(this.user)
   .then(data => {
     this.state.go('dashboard.splash');
     console.log('success');
   })
   .catch(data => {
     console.log("error");
   });
  }
}

export default SignupController;
