(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyShoppingController', ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyShoppingController.$inject= ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.to_buy_list = ShoppingListCheckOffService.getItems();

    toBuy.removeItem = function (index) {
      ShoppingListCheckOffService.removeItem(index);
    };
  }

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.bought_list = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {

      var service = this;
      var bought_list = [];
      var to_buy_list = [
        {
          name : "Milk",
          quantity : "2"
        },
        {
          name : "Cookies",
          quantity : "100"
        },
        {
          name : "Chocolate",
          quantity : "10"
        },
        {
          name : "Donuts",
          quantity : "12"
        },
        {
          name : "Pizza",
          quantity : "8"
        }
      ];

      this.removeItem = function (index) {
            var item = to_buy_list[index];
            bought_list.push(item);
            to_buy_list.splice(index, 1);

        };

      this.getItems = function () {
            return to_buy_list;
        };

      this.getBoughtItems = function() {
            return bought_list;
        };
  }

})();
