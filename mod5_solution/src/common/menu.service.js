(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath', '$rootScope'];
function MenuService($http, ApiPath, $rootScope) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getSingleMenuItems = function (item) {
    var config = {};
    if (item) {
      config.params = {'category': item};
    }

    return $http.get(ApiPath + '/menu_items/' + item + '.json').then(function(response){
      $rootScope.$broadcast('MenuService:menuItemSearch', {response:true});
      return response.data;
    }).catch(function (error){
        $rootScope.$broadcast('MenuService:menuItemSearch', {response:false});
        return error.data
    });
  }

}



})();
