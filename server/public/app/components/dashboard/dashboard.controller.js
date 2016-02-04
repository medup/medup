'use strict';

class DashboardController {
  constructor($state, $scope, AuthFactory) {
    console.log('dashboard scope', $scope);
    this.scope = $scope;
    this.scope.name = 'dashboard';
    this.scope.state = $state;
    this.scope.state.go('dashboard.splash');
    this.scope.isAuth = AuthFactory.isAuth;
  }

}

export default DashboardController;
