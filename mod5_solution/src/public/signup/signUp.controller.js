(function(){
"use strict";

angular.module('public').controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserSubscriptionService', 'MenuService'];

function SignUpController (UserSubscriptionService, MenuService){
    var ctrl = this;

    ctrl.saveUser = function (userModel){
        UserSubscriptionService.createUser(userModel);
    }

    ctrl.retrieveItem = function (shortName){
        var response = MenuService.getSingleMenuItems(shortName);
        return response;
    }
}

})();
