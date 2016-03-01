myApp.factory('DataFactory', ['$http', function($http) {

    // PRIVATE
    var animals = undefined;

    var getData = function() {
        var promise = $http.get('/data').then(function(response) {
            animals = response.data;
            return animals;
        });

        return promise;
    };

    var deleteFave = function(id) {
        $http({
            method: 'DELETE',
            url: '/data/' + id
        }).then(function(response) {
            console.log(response.data);
        });
    };

    function postFave(animals) {
        console.log('postFave animals id: ', animals.animalId);
        $http({
            method: 'POST',
            url: '/data',
            data: {
                id: animals.animalId,
                name: animals.animalName,
                description: animals.animalDesc,
                image: animals.animalImage
            }
        }).then(function(response) {
            console.log(response.data);
        });
        return postFave;
    }

    //PUBLIC
    var publicApi = {
        faveData: function() {
            return animals;
        },
        retrieveData: function() {
            return getData();
        },
        postToDatabase: function(animals) {
            postFave(animals);
            return postFave;
        },
        deleteFromDatabase: function(id) {
            deleteFave(id);
            return deleteFave;
        }
    };

    return publicApi;

}]);