'use strict';
//to do update
import template from './view-medications.html';
import controller from './medications.controller';

let medicationsComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default medicationsComponent;