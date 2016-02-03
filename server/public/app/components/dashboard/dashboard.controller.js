'use strict';

class DashboardController {
  constructor($state, $scope) {
    console.log('dashboard scope', $scope);
    this.name = 'dashboard';
    this.state = $state;
    this.state.go('dashboard.splash');
  }
}

export default DashboardController;
