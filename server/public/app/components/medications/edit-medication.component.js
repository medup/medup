'use strict';
//to do update
import template from './edit-medication.html';
import controller from './edit-medication.controller';

let medicationsComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default medicationsComponent;