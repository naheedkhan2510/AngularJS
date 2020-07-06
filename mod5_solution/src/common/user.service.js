(function(){
"use strict";

angular.module('common').service('UserSubscriptionService', UserSubscriptionService);

UserSubscriptionService.$inject = ['$http'];

function UserSubscriptionService (){
    var uss = this;
    var modelUser = {};

    uss.createUser = function (mockUser){
        modelUser.firstName = mockUser.firstName;
        modelUser.lastName = mockUser.lastName;
        modelUser.email = mockUser.email;
        modelUser.phone = mockUser.phone;
        modelUser.menuNumber = mockUser.menuNumber;
        console.log("Created user: ", modelUser);
    }

    uss.returnUser = function (){
        return modelUser;
    }
}
})();
