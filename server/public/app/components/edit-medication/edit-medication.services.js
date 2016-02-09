"use strict";

let addMedicationFactory = function($http) {

  let addMedication = (medication) => {
    return $http({
      method: 'POST',
      url: '/api/medications',
      data: medication
    }).then((resp) => {
      return resp.data;
    });
  };

  return {
    addMedication
  };

};

export default addMedicationFactory;
