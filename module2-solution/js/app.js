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
    toBuy.buy = function (index) {
        try{
            ShoppingListCheckOffService.moveToAlready(index);
            console.log(ShoppingListCheckOffService.getToBuy());
            console.log(ShoppingListCheckOffService.getAlready());

        }catch(error){
            toBuy.errorMessage = error.errorMessage;
        }
    };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
    var alreadyBought = this;
    alreadyBought.list = ShoppingListCheckOffService.getAlready();
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
            if (ToBuyList.length === 0){
                console.log("Se acabaron los items");
                throw new Error("All items(" + total+ ") bought.");
            }
    };

    service.getToBuy = function () {
        return ToBuyList;  
    };

    service.getAlready = function (){
        return AlreadyBoughtList;  
    };
}
})();