angular.module('mongogui', ['mongo_service']).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:MongoController, templateUrl:'/static/db_list.html'});
});


function MongoController($scope,MongoDB) {    
    $scope.db_list = MongoDB.query();         
    
    $scope.test = function(dbname) {    
        console.log('run test');
        MongoDB.get({database: dbname}, function(db) {
            $scope.selected_db = db.collections.db_name;            
        });
    };
    
    $scope.create_collection = function() {
        console.log('create collection :'+$scope.collection_name+'  on '+$scope.selected_db);        
        var newCollection = new MongoDB({database:$scope.selected_db,collection:$scope.collection_name});        
        console.log(newCollection.database);
        newCollection.$save();
        
    };
    
    $scope.delete_collection = function(collection) {
        console.log('delete collection :'+collection+'  on '+$scope.selected_db); 
        //del
    };
    
}
