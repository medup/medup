"use strict";

let AuthFactory = ($window, $state, $http) => {

    let hasToken = () => {
     return !!$window.localStorage.getItem('com.medUp');
    };

    let isAuth = {
      value: hasToken()
    };

    let validation = {
      password: new RegExp('.{8,}')
    };

    let signin = (user) => {
      return $http({
          method: 'POST',
          url: 'http://localhost:3000/user/signin',
          data: user
      })
      .then(response =>  {
        $window.localStorage.setItem('com.medUp', response.data.token)
        isAuth.value = true;
      });
    };

    let signup = (user) => {
      console.log("printing from the AuthFactory");
      return $http({
          method: 'POST',
          url: 'http://localhost:3000/user/signup',
          data: user
      })
      .then(response => {
        $window.localStorage.setItem('com.medUp', response.data.token)
        isAuth.value = true;
      });
    };

    let signout = () => {
      $window.localStorage.removeItem('com.medUp');
      $state.go('dashboard.splash');
      isAuth.value = false;
    };

    return {
      hasToken,
      signin,
      signup,
      signout,
      isAuth,
      validation
    }

}

export default AuthFactory;
