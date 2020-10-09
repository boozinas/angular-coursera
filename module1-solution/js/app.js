(function() {
'use strict';

angular.module('LunchCheck',[])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject=['$scope'];
function LunchCheckController($scope){
    $scope.list = "";
    $scope.output = "";
    $scope.color = "";

    $scope.checkIfTooMuch = function(){
        var listToCount = $scope.list;
        var elements = 0;
        elements = countElementsByComma(listToCount);
        //I'm not counting the 'empty' item 
        if(listToCount != ""){
            if (elements > 3){
                $scope.output = "Too much!";
                $scope.color = "green";
            }else if (elements >= 1){
                $scope.output = "Enjoy!";
                $scope.color = "green";
                console.log(elements);
            }
        }
        else{
            $scope.output = "Please enter data first";
            $scope.color = "red";
        }
    };

    function countElementsByComma(string){
        var total = 0;
        var separated = string.split(",");
        total = separated.length;
        return total;
    };
}

})();