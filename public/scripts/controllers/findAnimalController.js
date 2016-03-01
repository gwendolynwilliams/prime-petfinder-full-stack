myApp.controller('FindAnimalController', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {

    $scope.data = {};
    $scope.dataFactory = DataFactory;
    $scope.showAnimal = false;
    $scope.favoriteAdded = false;
    $scope.location = '';
    $scope.animalDropdown ='';

    //to create dropdown menu
    $scope.chooseAnimal = function() {
        var animalType = $scope.animalDropdown;
        $scope.showAnimal = true;
        $location.url('findAnimal');
        petFinder(animalType);
    };

    //calls in the data route and calls the favoriteAnimal function
    $scope.addFavorite = function() {
        var animals = {
            animalId: $scope.animal.id.$t,
            animalName: $scope.animal.name.$t,
            animalDesc: $scope.animal.description.$t,
            animalImage: $scope.animal.media.photos.photo[2].$t
        };
        console.log('animals object from animal controller: ', animals);
        $scope.dataFactory.postToDatabase(animals);
        $scope.favoriteAdded = true;

        $scope.dataFactory.retrieveData().then(function() {
            $scope.favorites = $scope.dataFactory.faveData();
        });

        return animals;
    };

    $scope.dataFactory.retrieveData().then(function() {
        $scope.favorites = $scope.dataFactory.faveData();
    });

    function petFinder(animalType) {
        // API key
        var key = 'ff1c522ca21887293656f30fae8861f5';

        var baseURL = 'http://api.petfinder.com/';
        var query = 'pet.getRandom';
        query += '?key=' + key;
        query += '&animal=' + animalType;
        query += '&output=basic';
        query += '&format=json';

        var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
        console.log(request);

        $http.jsonp(request).then(
            function(response) {
                $scope.animal = response.data.petfinder.pet;
                console.log($scope.animal);
            }
        );
    }

    petFinder();

}]);
