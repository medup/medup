"use strict";

import template from './add-medication.html';
import controller from './add-medication.controller';

let addMedicationComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default addMedicationComponent;
