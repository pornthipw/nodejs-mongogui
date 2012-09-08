angular.module('mongo_service', ['ngResource']).
    factory('MongoDB', function($resource){
        var MongoDB  = $resource('/db/:database', {
//            query: {method:'GET', isArray:false}
        });   
        return MongoDB;
});
