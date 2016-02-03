//Todo: update
class SigninController {
  constructor($state, AuthService) {
    this.user = {};
    this.title = 'Sign Up';
    
    AuthService.signup(this.user).then(data => $state.go('dashboard').catch(data => console.log("error")));
 }
}

export default SigninController;