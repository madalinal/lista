app.controller('personCtrl', ['$scope','$http',


    function ($scope, $http) {

        $scope.denumire = "",
            $scope.amanunte = "",
            $scope.myVar = true


        $scope.toggle = function () {
            $scope.myVar = !$scope.myVar;
        };

        $scope.listItems = [
            {denumire: 'produs1', amanunte: 'import', cumparat: false, editare: true}];

        //afisez elementele din baza

        $scope.reincarcare = function () {

        $http.get("http://localhost:8080/api/lista").
            success(function (data, status, headers, config) {
                $scope.listItems = data;
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };
        $scope.reincarcare();

        // adaug produs
        //$scope.addListItem = function (denumireToPush, amanunte) {
        //    $scope.listItems.push({denumire: denumireToPush, amanunte: amanunte, cumparat:false,editare:true });
        //
        //};
        $scope.addListItem = function (denumireToPush, amanunte) {
            $http({
                method: 'POST',
                url: "http://localhost:8080/api/lista",
                data: {denumire: denumireToPush, amanunte: amanunte, cumparat: false, editare: true}
            }).success(function (data, status) {
                $scope.status = status;
                $scope.data = data;
                $scope.reincarcare();
            })
                .error(function (err) {
                    console.log(err);
                })
        };

        // sterg produs din lista

        /* $scope.removeListItem = function (itemToRemove) {
         var i = $scope.listItems.indexOf(itemToRemove);
         $scope.listItems.splice(i, 1)

         };
         */

        $scope.removeListItem = function (itemToRemove)
        {
            $http.delete("http://localhost:8080/api/lista/" + itemToRemove._id)
                .success(function(data, status, headers, config) {
                    $scope.listItems=data;
                    $scope.reincarcare();
                })
                .error(function(data, status, headers, config) {

                });
        };




        $scope.cumparat = function (item) {
            var i = $scope.listItems.indexOf(item);
            $scope.listItems[i].cumparat = !$scope.listItems[i].cumparat;
        };


        $scope.removeAllCumparat = function () {

            for (var i = 0; i < $scope.listItems.length; i++) {
                if ($scope.listItems[i].cumparat == true) {
                    $scope.listItems.splice(i, 1);
                    i--;
                }
            }
        };
        $scope.editareShow = function (item) {
            item.editare = false;
        };

        //$scope.salvareEditare = function (item, denNew, amanNew) {
        //    item.editare = true;
        //    item.denumire = denNew;
        //    item.amanunte = amanNew;
        //};

        $scope.salvareEditare= function (item, denNew, amanNew) {
            $http({
                method: 'PUT',
                url: "http://localhost:8080/api/lista/"+ item._id,
                data: {denumire: denNew, amanunte: amanNew, cumparat: false, editare: true}
            })
                .success(function (data, status) {
                $scope.status = status;
                $scope.data = data;
                  $scope.reincarcare();
            })
                .error(function (err) {
                    console.log(err);
                })
        };


    }
]);