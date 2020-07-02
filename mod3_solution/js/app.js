(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems)
  .constant('apiBaseUrl', 'https://davids-restaurant.herokuapp.com/');

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController (MenuSearchService) {
    var ctrl = this;

    ctrl.narrowDown = function() {
      if (ctrl.searchTerm === undefined || ctrl.searchTerm === "") {
        ctrl.found = [];
        return;
      }


      var result = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)

      if (result.then) {
        result.then(function (response) {
            ctrl.found = response;
          })
      } else {
        ctrl.found = result;
      }
    }

    ctrl.onRemove = function (index) {
        MenuSearchService.onRemove(index.index);
    }
  }

  function FoundItems () {
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
        found: '<foundItems',
        onRemove: '&'
      },
      controller: 'NarrowItDownController as dirCtrl',
      link: NothingFound
    }

    return ddo;
  }

  function NothingFound(scope, element, attrs, controller) {
    scope.$watch('found', function (newValue, oldValue) {

      // show when new value is [] and not on load
      if(newValue && !newValue.length) {
        element.find('h2').css('display', 'block');
      } else {
        element.find('h2').css('display', 'none');
      }

    });

    // scope.$watch('onRemove()', function(newValue, oldValue) {
    //   console.log(newValue);
    //   console.log(oldValue);
    // })
  }

  MenuSearchService.$inject = ['$http', 'apiBaseUrl'];
  function MenuSearchService ($http, apiBaseUrl) {
    var service = this;
    var items = [];
    var foundItems = [];

    service.getMatchedMenuItems = function (searchTerm) {
      if(items.length) {
        return getMatched(searchTerm);
      } else {
        return $http({
          method: "GET",
          url: (apiBaseUrl + 'menu_items.json')
        }).then(function(response) {
          items = response.data.menu_items;
          return getMatched(searchTerm);
        });
      }
    }

    function getMatched(searchTerm) {
      foundItems = [];

      for(var i = 0; i < items.length; i++) {
        var item = items[i];

        if (item.description && item.description.toLowerCase().search(searchTerm.toLowerCase()) !== - 1) {
          foundItems.push(item);
        }
      }

      return foundItems;
    }

    service.onRemove = function (index) {
      foundItems.splice(index, 1);
    }
  }
})();
