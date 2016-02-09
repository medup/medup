"use strict";

let editMedicationFactory = function($http) {

  let editMeds = (user) => {
    return $http({
      method: 'PUT',
      url: 'http://localhost:3000/api/medications',
      data: user
    })
    .then(response =>  {
      return response.data;
    }, error => {
      return error;
    });
  };

  return {
    editMeds
  };

};

export default editMedicationFactory;
