angular.module('mongogui', ['mongo_service']).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:MongoController, templateUrl:'/static/db_list.html'});
});


function MongoController($scope,MongoDB) {    
    $scope.db_list = MongoDB.query();
    console.log($scope.db_list.length);
    
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
        newCollection.$save(function(status) {
            $scope.db_list = MongoDB.query();                     
        });                
    };
    
    $scope.show_db_detail_class = function(dbName) {
        console.log(dbName + ' vs ' +$scope.selected_db);
        if(dbName == $scope.selected_db) {
            return "in";
        }
    };
    
    $scope.get_collection = function(dbname, collection) {
        console.log('get collection :'+collection+'  on '+dbname); 
        MongoDB.get({database: dbname,collection:collection}, function(db) {     
            $scope.collection_stats = db.stats;
            $scope.selected_db = dbname;
            $scope.selected_collection = db.title;
            console.log(db.stats);
                   
        });
         $scope.showInput = true;
    };
    
    $scope.delete_collection = function(selected_db, selected_collection ) {
        console.log('delete collection :'+selected_collection +'  on '+selected_db); 
        //del
        MongoDB.delete({database: selected_db,collection:selected_collection}, function(status) {            
            console.log(status);
            if(status.success) {
               $scope.db_list = MongoDB.query(); 
            }            
        });
    };
    
    $scope.rename_collecton = function(selected_db, selected_collection ) {
        var self = this;
        console.log('rename collection :'+selected_collection +'  on '+selected_db); 
        //rename
        $scope.selected_collection.update(function(status){
            console.log(status);
        });
    };
    
}
