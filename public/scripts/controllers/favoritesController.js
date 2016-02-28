myApp.controller('FavoritesController', ['$scope', 'DataFactory', function($scope, DataFactory) {
    $scope.data = {};
    $scope.dataFactory = DataFactory;

    $scope.favorites = [];

    if($scope.dataFactory.faveData() === undefined) {
        // initial load
        $scope.dataFactory.retrieveData().then(function() {
            $scope.favorites = $scope.dataFactory.faveData();
        });
    } else {
        $scope.favorites = $scope.dataFactory.retrieveData();
    }

}]);