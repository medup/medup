class SignupService {
    constructor($window, $state, $http) {
      this.$window = $window;
      this.$state = $state;
      this.$http = $http;
    }
    signin() {
        return this.$http.get('api/user/details');
    }
}

export default signupFactory;