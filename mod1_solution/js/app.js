(function () {

  angular.module('LunchCheck', [])

  .controller('LunchCheckController', LunchCheckdo);

  LunchCheckdo.$inject=['$scope'];

  function LunchCheckdo($scope) {
    $scope.name = "";
    $scope.msg = "";
    $scope.words = [''];

    $scope.check = function () {
      $scope.words = $scope.name.split(',');
      if ($scope.name === "") {
        $scope.msg = "Please enter data first";
      } else if ($scope.words.length <= 3) {
        $scope.msg ="Enjoy!" ;
      } else {
        $scope.msg ="Too much!" ;
      }
    }
  }

})();
