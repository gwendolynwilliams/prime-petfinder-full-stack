myApp.factory('DataFactory', ['$http', function($http) {
    // PRIVATE
    var animals = undefined;

    //var getData = function() {
    //    console.log('getting data from server');
    //    var promise = $http.get('/data').then(function(response) {
    //        animals = response.data;
    //        console.log('Async data response:', animals);
    //    });
    //
    //    return promise;
    //};

    function postFave(animals) {
        console.log('postFave animals id: ', animals.animalId);
        $http({
            method: 'POST',
            url: '/data',
            //data: animals
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
        //retrieveData: function() {
        //    return getData();
        //},

        postToDatabase: function(animals) {
            postFave(animals);
            return postFave;
        }
    };

    return publicApi;

}]);