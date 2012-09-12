angular.module('mongo_service', ['ngResource']).
    factory('MongoDB', function($resource){
        var MongoDB  = $resource('/db/:database/:collection', 
            {database:'@database',collection:'@collection'},
            { update: {method: 'PUT'}}
        );   
        
         MongoDB.prototype.update = function(cb) {
                return MongoDB.update({datatabse:this.database ,collection:this.collection},
                   function() {
                });
        };
        
        return MongoDB;
});
