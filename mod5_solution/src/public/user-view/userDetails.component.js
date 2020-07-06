(function(){
"use strict";

angular.module('public').component('showUser', {
    templateUrl: 'src/public/user-view/userDetails.html',
    bindings:{
        userModel : '<',
        retrieveItem: '&'
    },
    controller : UserDetailsController,
})

UserDetailsController.$inject = ['ApiPath'];
function UserDetailsController(ApiPath){
    var ctrl = this;
    ctrl.basePath = ApiPath;
    ctrl.warning = true;
    ctrl.retrieveItem({i:ctrl.userModel.menuNumber}).then(function (response){
        ctrl.menuItem = response;
    });
    ctrl.registeredUser = function (){
        if (angular.equals(ctrl.userModel, {})){
            ctrl.warning = true;
            return false;
        }else{
            ctrl.warning = false;
            return true;
        }
    }




}

})(); 
