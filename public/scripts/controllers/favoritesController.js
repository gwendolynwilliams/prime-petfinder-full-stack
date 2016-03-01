myApp.controller('FavoritesController', ['$scope', 'DataFactory', function($scope, DataFactory) {

    $scope.dataFactory = DataFactory;

    $scope.favorites = [];

    $scope.dataFactory.retrieveData().then(function() {
        $scope.favorites = $scope.dataFactory.faveData();
    });

    $scope.deleteFavorite = function(id) {
        console.log('delete id from fave controller: ', id);
        $scope.dataFactory.deleteFromDatabase(id);

        $scope.dataFactory.retrieveData().then(function() {
            $scope.favorites = $scope.dataFactory.faveData();
        });

    };

}]);