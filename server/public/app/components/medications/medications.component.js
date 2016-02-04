'use strict';
//to do update
import template from './view-medications.html';
import medicationsController from './medications.controller';


let medicationsComponent = {
  restrict: 'E',
  bindings: {},
  template,
  medicationsController,
  controllerAs: 'vm'
};

export default medicationsComponent;