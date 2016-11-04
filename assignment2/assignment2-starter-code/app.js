(function (){
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

 ToBuyController.$inject = ['ShoppingListCheckOffService'];
 function ToBuyController(ShoppingListCheckOffService){
	 var buyItems = this;
	 buyItems.name = "";
	 buyItems.quantity = "";
	 buyItems.list = ShoppingListCheckOffService.getItems();
	 buyItems.addItem = function(itemName,itemQuantity){
		 try{
		 ShoppingListCheckOffService.addItem(itemName,itemQuantity);
		 }
		 catch(error){
			 buyItems.errorMessage = error.message;
		 }
	 }
 }

 AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
 function AlreadyBoughtController(ShoppingListCheckOffService){
	 var boughtItems = this;
   try{
	    boughtItems.list = ShoppingListCheckOffService.getBoughtItems();
    }
    catch(error){
      boughtItems.error = error.message;
    }

 }

 function ShoppingListCheckOffService(){
	 var service = this;

	 var toBuyList = [
	  {
		  name : "cookies",
		  quantity : "5"
	  },
	  {
		  name : "chips",
		  quantity : "10"
	  },
	  {
		  name : "apple pie",
		  quantity : "3"
	  },
	  {
		  name : "lemonade",
		  quantity : "5"
	  },
	  {
		  name : "soda",
		  quantity : "5"
	  }
	 ];

	 var boughtList = [];

	 service.addItem = function(itemName,itemQuantity){

		 if(toBuyList.length>=1){
		toBuyList.splice(itemName,1);

		var myList = {
			name : itemName,
      quantity : itemQuantity
		};
		 boughtList.push(myList);

     if(toBuyList.length<1){
       throw new Error("Everything is bought");
     }
		 }
	 }

	 service.getBoughtItems = function(){
       return boughtList;

	 };

	 service.getItems = function(){
		 return toBuyList;
	 };

 }

})();
