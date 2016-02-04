"use strict";

class SigninController {
  constructor($state, $scope, AuthFactory) {
    this.scope = $scope;
    this.scope.AuthFactory = AuthFactory;
    this.scope.user = {};
    this.scope.title = 'Sign In';
    this.scope.action = 'Sign In';
    this.scope.submit = this.submit;
    this.scope.state = $state;
    
  }
  submit() {
   this.AuthServices.signin(this.user)
   .then(data => {
     this.state.go('dashboard.splash');
     console.log('success');
   })
   .catch(data => {
     console.log("error");
   });
  }
}

export default SigninController;
