(function(){
  'use strict'

  angular.module("data")
  .service("MenuDataService",MenuDataService)
  .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ["$http","ApiBasePath"];
  function MenuDataService($http, ApiBasePath) {
    console.log("Calling MenuDataService");
    var service = this;
    //return a promise containing categories
    service.getAllCategories = function(){
      console.log("Inside getAllCategories");
      return $http({
        method:"get",
        url:(ApiBasePath + "/categories.json")
      }).then((response)=>{
        return response.data;
      }).catch((err) => {
        console.log("error:",err.status);
      });
    };
    //fetch menu items based on the categoryShortName passed in to the function
    service.getItemsForCategories = function(categoryShortName){
      console.log("Inside getItemsForCategories:",categoryShortName);
      return $http({
        method:"get",
        url:(ApiBasePath + "/menu_items.json?category=" + categoryShortName)
      }).then((response)=>{
        return response.data;
      }).catch((err) => {
        console.log("error:",err.status);
      });
    };
  }
})();
