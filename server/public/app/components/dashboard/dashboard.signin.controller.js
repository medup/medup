//Todo: update
class SigninController {
  constructor($state, AuthService) {
    this.user = {};
    this.title = 'Sign In';
    this.action = 'Sign In';
    AuthService.signin(this.user).then(data => $state.go('dashboard').catch(data => console.log("error")));
 }
}

export default SigninController;