'use strict';

class DashboardController {
  constructor($state, $scope, AuthFactory) {
    this.scope = $scope;
    this.scope.name = 'dashboard';
    this.scope.state = $state;
    this.scope.state.go('dashboard.splash');
    angular.extend(this.scope, AuthFactory);
  }
}

export default DashboardController;



