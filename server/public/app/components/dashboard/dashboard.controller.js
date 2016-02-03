'use strict';

class DashboardController {
  constructor($state) {
    this.name = 'dashboard';
    this.state = $state;
    this.state.go('dashboard.splash');
  }
}

export default DashboardController;
