(function () {
  'use strict'

  angular.module("MenuApp")
  .config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider){
    //Redirect to home page incase of invalid url
    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('home',{
      url: "/",
      templateUrl:"src/templates/home.template.html"
    })

    .state('categories',{
      url : "/categories",
      templateUrl : "src/templates/router-categories.template.html",
      controller : "CategoriesController as cctrl",
      resolve : {
          categories: ["MenuDataService",function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
      }
    })

    .state('items',{
      url :"/categories/items/{categoryShortName}",
      templateUrl : "src/templates/router-items.template.html",
      controller : "ItemsController as ictrl",
      resolve : {
        items : ["$stateParams","MenuDataService", function($stateParams, MenuDataService){
          return MenuDataService.getItemsForCategories($stateParams.categoryShortName);
        }]
      }
    });
  }
})();
