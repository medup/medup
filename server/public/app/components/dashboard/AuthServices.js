"use strict";

let AuthFactory = function() {

  let hasToken = () => {
     return !!this.window.localStorage.getItem('com.medUp');
  };

  let signin = (user) => {
    return this.http({
        method: 'POST',
        url: 'http://localhost:3000/user/signin',
        data: user
    })
    .then(response => this.window.localStorage.setItem('com.medUp', response.data.token));
  };

    let signup = (user) => {
      return this.http({
          method: 'POST',
          url: 'http://localhost:3000/user/signup',
          data: user
      })
      .then(response => this.window.localStorage.setItem('com.medUp', response.data.token));
    };

    let signout = () => {
      this.window.localStorage.removeItem('com.medUp');
      this.state.go('dashboard.signin');
    };

    return {
      hasToken,
      signin,
      signup,
      signout
    };
};

export default AuthFactory;
