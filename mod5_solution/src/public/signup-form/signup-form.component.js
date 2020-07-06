(function(){
"use strict";

angular.module('public').component('signupForm', {
    templateUrl: 'src/public/signup-form/signup-form.html',
    controller: formController,
    bindings:{
        storeUser : '&',
        retrieveItem : '&'
    }
});

formController.$inject = ['$rootScope'];

function formController ($rootScope){
    var ctrl = this;
    ctrl.user = {};
    ctrl.warning, ctrl.success = false;

    ctrl.signUp = function (){
        ctrl.retrieveItem({shortName: ctrl.menuNumber.toUpperCase()}).then(function (response){
            if(response.status == 500){
                ctrl.warning = true;
                ctrl.success = false
            }else{
                ctrl.user.firstName = ctrl.firstName;
                ctrl.user.lastName = ctrl.lastName;
                ctrl.user.email = ctrl.email;
                ctrl.user.phone = ctrl.phone;
                ctrl.user.menuNumber = ctrl.menuNumber.toUpperCase();
                ctrl.storeUser({userModel: ctrl.user});
                ctrl.warning = false;
                ctrl.success = true;
            }
         })
    };

    /*Event for menu item retrieval process*/

    // $rootScope.$on('MenuService:menuItemSearch', function(event, data){
    //     if(data.response === false){
    //         console.log('Failure was catched successfully', event)
    //         itemStatus = false;
    //     };
    //     if(data.response === true){
    //         console.log('Success was catched correctly', event)
    //         itemStatus = true;
    //     };
    // })
}

})();
