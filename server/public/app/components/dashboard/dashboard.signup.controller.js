"use strict";

class SignupController {
  constructor($state, $scope, AuthFactory, $window) {
    this.scope = $scope;
    this.scope.AuthFactory = AuthFactory;
    this.scope.user = {};
    this.scope.title = 'Sign Up';
    this.scope.action = 'Sign Up';
    this.scope.submit = this.submit;
    this.scope.state = $state;
    this.scope.validation = AuthFactory.validation;
    this.scope.submitted = false;
    this.scope.warning = 'Password must be at least 8 characters';
 }
 submit(form) {
  this.submitted = true;
  if (form.$invalid) return;
   this.AuthFactory.signup(this.user)
   .then(data => {
     this.state.go('dashboard.splash');
     console.log('success');
   })
   .catch(data => {
     if (data.status === 409) {
      this.warning = 'User with that name already exists';
      form.$setValidity('email', false);
     }
   });
  }
}

export default SignupController;
