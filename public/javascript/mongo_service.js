angular.module('mongo_service', ['ngResource']).
    factory('MongoDB', function($resource){
        var MongoDB  = $resource('/db/:database/:collection', 
            {database:'@database',collection:'@collection'}, {            
        });   
        return MongoDB;
});
