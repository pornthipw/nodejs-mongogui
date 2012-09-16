angular.module('mongo_service', ['ngResource']).
    factory('MongoDB', function($resource) {
        var MongoDB  = $resource('/db/:database/:collection/:document', 
            {database:'@database',collection:'@collection',document:'@document'},
            { rename_collection: {method: 'PUT'}
        });           
        return MongoDB;
});

angular.module('gridstore_service', ['ngResource']).
    factory('GridStore', function($resource) {
        var GridStore  = $resource('/gridstore/:database', 
            {database:'@database'},
            {
        });           
        return GridStore;
});

