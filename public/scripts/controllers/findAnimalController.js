myApp.controller('FindAnimalController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
    $scope.data = {};
    $scope.dataFactory = DataFactory;
    $scope.showAnimal = false;

    //to create dropdown menu
    $scope.chooseAnimal = function() {
        var animalType = $scope.animal;
        petFinder(animalType);
    };

    //calls in the data route and calls the favoriteAnimal function
    $scope.addFavorite = function(id, name, description, image) {
        var animals = {
            animalId: id,
            animalName: name,
            animalDesc: description,
            animalImage: image
        };

        //var animals = [];
        //animals.push(id, name, description, image);
        console.log('animals object from animal controller: ', animals);
        $scope.dataFactory.postToDatabase(animals);
        return animals;
    };

    function petFinder(animalType) {
        // API key
        var key = 'ff1c522ca21887293656f30fae8861f5';

        //if(animalType === undefined) {
        //    animalType = 'dog';
        //}

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
        $scope.showAnimal = true;
        //console.log($scope.showAnimal);
    }

    petFinder();

}]);
