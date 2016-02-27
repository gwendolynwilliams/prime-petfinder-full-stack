myApp.controller('FindAnimalController', ['$scope', '$http', function($scope, $http) {
    $scope.data = {};

    $scope.storeAnimal = function() {
        var animalType = $scope.animal;
        console.log(animalType);
        petFinder(animalType);
    };



    function petFinder(animalType) {
        // API key
        var key = 'ff1c522ca21887293656f30fae8861f5';

        if(animalType === undefined) {
            animalType = 'dog';
        }

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



//<select ng-model="anotherLocationId" onchange="petFinder(this.options(this.selectedIndex).value)" >
//    <option ng-repeat="location in locations" value="{{location.LocationId}}">{{location.LocationName}}</option>
//</select>