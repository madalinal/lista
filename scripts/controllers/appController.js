app.controller('personCtrl', ['$scope',
function ($scope) {
    $scope.denumire = "",
    $scope.amanunte = "",
    $scope.myVar = true,

        
        $scope.toggle = function () {
            $scope.myVar = !$scope.myVar;
        }

        $scope.listItems = [
            {denumire: 'produs1', amanunte:'import' ,cumparat:false}];


        // adaug produs
        $scope.addListItem = function (denumireToPush, amanunte) {
            $scope.listItems.push({denumire: denumireToPush, amanunte: amanunte, cumparat:false });

        };

        // sterg produs din lista
        $scope.removeListItem = function (itemToRemove) {
           var i = $scope.listItems.indexOf(itemToRemove);
            $scope.listItems.splice(i,1)

        };
        $scope.cumparat=function(item){
            var i = $scope.listItems.indexOf(item);
            $scope.listItems[i].cumparat=!$scope.listItems[i].cumparat;
        }
        $scope.removeAllCumparat=function(){

          for (  var i=0;i<$scope.listItems.length;i++) {
              if ($scope.listItems[i].cumparat == true)
                  $scope.listItems.splice(i, 1)
          }
        }


}
]);