(function (){
  'use strict';

  angular.module('LunchCheck',[])
  .controller('LunchCheckController',Assignment1Controller);

  Assignment1Controller.inject = ['$scope'];
  function Assignment1Controller($scope) {
    $scope.text = "";
    $scope.message = "";

    $scope.totalItems = function () {
      var totalCount = calaculateCount($scope.text);
      if(totalCount == 0){
        $scope.message = "Please enter data first";
      }
      else if(totalCount <= 3){
        $scope.message = "Enjoy!";
      }
      else{
        $scope.message = "Too much!";
      }
    };

    function calaculateCount(textString) {
      var items = textString.split(',');
      var count = 0;
      for(var i = 0; i < items.length ; i++)
        if(items[i] != ""){
          count++;
        }
      return count;
    }

  }
})();
