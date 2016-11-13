(function (){
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .constant('baseUrl',"https://davids-restaurant.herokuapp.com/menu_items.json")
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective(){
    var ddo = {
      templateUrl: 'listitems.html',
      restrict: 'E',
      scope:{
        list:'<list',
        onRemove: '&'
      }
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService','$scope'];
  function NarrowItDownController(MenuSearchService,$scope){
    var list = this;

    list.getItem = function(){
      var item = $scope.itemToSearch;
      return item;
    }

    list.searchItem = function(){
      var searchTerm = list.getItem();
      if(searchTerm == null || searchTerm == undefined){
        $scope.message = "Nothing found";
      }
      else{
        if(searchTerm.length > 0)
        {
          var promise = MenuSearchService.getMenuItems();
          promise
          .then(function(response){
            var foundItems = Object.values(response.data);
            list.found = MenuSearchService.getMatchedMenuItems(foundItems,searchTerm);
              if(list.found==null){
                $scope.message = "Nothing found";
                searchTerm = undefined;
              }
              else{
                $scope.message = null;
                searchTerm = undefined;
              }
          })
          .catch(function(error){
              $scope.message = "Nothing found";
          })
        }
        else{
          $scope.message = "Nothing found";
          list.found = null;
        }
      }
    };

    list.removeItem = function(itemIndex){
      MenuSearchService.removeItem(itemIndex);
    };
  }

  MenuSearchService.$inject = ['$http','baseUrl'];
  function MenuSearchService($http,baseUrl) {
    var service = this;
    var found = [];
    service.getMenuItems = function(){
      var response = $http({
        method : 'GET',
        url : baseUrl
      });
      return response;
    };

    service.getMatchedMenuItems = function(arrayList,searchTerm){
      if(found.length > 0)
      {
        found.length = 0;
      }
      for(var i=0; i < arrayList[0].length;i++)
      {
        var arrayItem = arrayList[0][i];
        console.log(arrayItem);
        if(arrayItem["description"].toLowerCase().indexOf(searchTerm.toLowerCase())!= -1)
        {
           var newItem = {
             name: arrayItem["name"],
             short_name: arrayItem["short_name"],
             description: arrayItem["description"]
           }
           found.push(newItem);
        }
      }
      if(found.length>0)
      {
        return found;
      }
      else{
        return null;
      }
    };

    service.removeItem = function(itemIndex){
      found.splice(itemIndex,1);
    }
  }

})();
