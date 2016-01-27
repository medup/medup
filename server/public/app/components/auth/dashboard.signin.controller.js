//Todo: update
class AuthController {
  constructor($scope, $state, AuthService) {
    this.user = {};
    AuthService.signin(this.user).then(data => $state.go('dashboard').catch(data => console.log("error")));
    AuthService.signup(this.user).then(data => $state.go('dashboard').catch(data => console.log("error")));
 }
}

export default AuthController;