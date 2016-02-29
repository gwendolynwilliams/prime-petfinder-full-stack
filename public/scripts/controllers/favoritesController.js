myApp.controller('FavoritesController', ['$scope', 'DataFactory', function($scope, DataFactory) {

    //$scope.data = {};  //do I need this?
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