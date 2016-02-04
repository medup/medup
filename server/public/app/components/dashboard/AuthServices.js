class AuthServices {
   constructor($window, $state, $http) {
     this.window = $window;
     this.state = $state;
     this.http = $http;
   }
     hasToken() {
      return !!this.window.localStorage.getItem('com.pillMeNow');
     }
 
     signin(user) {
       return this.http({
           method: 'POST',
           url: 'http://localhost:3000/user/signin',
           data: user
       })
       .then(response => this.window.localStorage.setItem('com.medUp', response.data.token));
 
     }
 
     signup(user) {
       return this.http({
           method: 'POST',
           url: 'http://localhost:3000/user/signup',
           data: user
       })
       .then(response => this.window.localStorage.setItem('com.medUp', response.data.token));
     }
 
     signout() {
       this.window.localStorage.removeItem('com.medUp');
       this.state.go('dashboard.signin');
 
     }
 
 }
 
 export default AuthServices; 
