let AuthFactory = ($http, $state, $window) {

    let hasToken = () => {
     return !!$window.localStorage.getItem('com.pillMeNow');
    };

    let signin = (user) => {
      return $http({
          method: 'POST',
          url: 'http://localhost:3000/user/signin',
          data: user
      })
      .then(response => $window.localStorage.setItem('com.medUp', response.data.token));

    };

    let signup = (user) => {
      console.log("printing from the AuthFactory");
      return $http({
          method: 'POST',
          url: 'http://localhost:3000/user/signup',
          data: user
      })
      .then(response => $window.localStorage.setItem('com.medUp', response.data.token));
    };

    let signout = () => {
      $window.localStorage.removeItem('com.medUp');
      $state.go('dashboard.signin');

    };

}

export default AuthFactory;