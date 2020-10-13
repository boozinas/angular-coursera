(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service("ShoppingListCheckOffService", ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;
    toBuy.list = ShoppingListCheckOffService.getToBuy();
    toBuy.empty = 0;
    toBuy.buy = function (index) {
            ShoppingListCheckOffService.moveToAlready(index);
            toBuy.empty=ShoppingListCheckOffService.compareCount();

    };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
    var alreadyBought = this;
    alreadyBought.list = ShoppingListCheckOffService.getAlready();
    alreadyBought.empty = function(){
        return ShoppingListCheckOffService.getCount();
    };
}

function ShoppingListCheckOffService(){
    var service = this;
    var AlreadyBoughtList = [];
    var count = 0;
    var ToBuyList = [
        {
            name: "tortillas",
            quantity: 50
        },
        {
            name: "nopales",
            quantity: 5
        },
        {
            name: "aguacates",
            quantity: 3
        },
        {
            name: "chiles",
            quantity: 7
        },
        {
            name: "chayotes",
            quantity: 5
        },
        {
            name: "toothbrushes",
            quantity: 2
    }
    ];
    var total = ToBuyList.length;

    service.moveToAlready = function (index) {
        AlreadyBoughtList.push(ToBuyList[index]);
        ToBuyList.splice(index, 1);
        count++;
    };

    service.getToBuy = function () {
        return ToBuyList;  
    };

    service.getAlready = function (){
        return AlreadyBoughtList;  
    };

    service.getCount = function (){
        return count;
    };

    service.compareCount = function () {
      return count === total;  
    };
}
})();