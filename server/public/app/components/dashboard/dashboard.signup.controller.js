"use strict";

// import AuthFactory from './AuthFactory';

class SignupController {
  constructor($state, $scope) {
    console.log("kayla" + $scope);
    this.scope = $scope;
    this.scope.user = {};
    this.scope.title = 'Sign Up';
    this.scope.action = 'Sign Up';
    this.state = $state;
 }
 submit() {
   // console.log('Kayla');
   // AuthFactory.signup(this.user)
   // .then(data => {
   //   this.state.go('dashboard');
   //   console.log('success');
   // })
   // .catch(data => {
   //   console.log("error");
   // });
 }
}

export default SignupController;
