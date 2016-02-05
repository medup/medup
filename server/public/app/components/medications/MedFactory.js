"use strict";

let MedFactory = function($http) {

  let getMeds = (user) => {
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/medications',
      data: user
    })
    .then(response =>  {
      return response.data;
    }, error => {
      return error;
    });
  };

  let deleteMeds = (medId) => {
    return $http({
      method: 'DELETE',
      url: 'http://localhost:3000/api/medications/' + medId
    })
    .then(response =>  {
      return response.data;
    }, error => {
      return error;
    });
  };

  let updateMeds = (user) => {
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
    getMeds,
    deleteMeds,
    updateMeds
  }

}

export default MedFactory;