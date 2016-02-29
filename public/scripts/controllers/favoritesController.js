myApp.controller('FavoritesController', ['$scope', 'DataFactory', function($scope, DataFactory) {

    $scope.dataFactory = DataFactory;

    $scope.favorites = [];

    $scope.dataFactory.retrieveData().then(function() {
        $scope.favorites = $scope.dataFactory.faveData();
    });

}]);