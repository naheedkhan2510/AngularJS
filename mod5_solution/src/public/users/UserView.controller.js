(function(){
"use strict";

angular.module('public').controller('UserViewController', UserViewController);

UserViewController.$inject = ['UserSubscriptionService', 'MenuService'];

function UserViewController(UserSubscriptionService, MenuService){
    var ctrl = this;

    ctrl.$onInit = function (){
        ctrl.user = UserSubscriptionService.returnUser();
    };

    ctrl.retrieveItem = function (i){
        var response = MenuService.getSingleMenuItems(i);
        return response
    }

}
})();
