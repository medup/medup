"use strict";

class NavbarController {
  constructor($scope, AuthFactory) {
    this.name = 'navbar';
    this.scope = $scope;
    angular.extend(this.scope, AuthFactory);
  }
}

export default NavbarController;
