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
        $scope.showInput = false;
    };
    
    $scope.create_collection = function() {
        console.log('create collection :'+$scope.collection_name+'  on '+$scope.selected_db);        
        var newCollection = new MongoDB({database:$scope.selected_db,collection:$scope.collection_name});        
        console.log(newCollection.database);
        newCollection.$save();
        $scope.db_list = MongoDB.query();             
        console.log($scope.db_list);
        
    };
    
    $scope.get_collection = function(dbname, collection) {
        console.log('get collection :'+collection+'  on '+dbname); 
        MongoDB.get({database: dbname,collection:collection}, function(db) {     
            $scope.collection_stats = db.stats;
            $scope.title = db.title;
            console.log(db.stats);
                   
        });
         $scope.showInput = true;
    };
    
    $scope.delete_collection = function(selected_db, title) {
        console.log('delete collection :'+title+'  on '+selected_db); 
        //del
        MongoDB.get({database: selected_db,collection:title}, function(db) {
            //console.log();
        });
    };
    
}
