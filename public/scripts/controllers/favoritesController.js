myApp.controller('FavoritesController', ['$scope', 'DataFactory', function($scope, DataFactory) {
    $scope.data = {};
    $scope.dataFactory = DataFactory;

    $scope.animals = [];

    if($scope.dataFactory.faveData() === undefined) {
        // initial load
        $scope.dataFactory.retrieveData().then(function() {
            $scope.animals = $scope.dataFactory.faveData();
        });
    } else {
        $scope.animals = $scope.dataFactory.faveData();
    }

}]);