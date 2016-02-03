"use strict";

// import AuthServices from './AuthServices';

class SigninController {
  constructor($state, $scope) {
    this.scope = $scope;
    this.scope.user = {};
    this.scope.title = 'Sign In';
    this.scope.action = 'Sign In';
    this.scope.state = $state;
    this.scope.submit = this.submit;
  }
  submit() {
   console.log('submited');
  //  AuthServices.signin(this.user)
  //  .then(data => {
  //    console.log('success');
  //  })
  //  .catch(data => {
  //    console.log("error");
  //  });
  }
}

export default SigninController;
