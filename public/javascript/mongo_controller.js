function MongoController($scope,MongoDB) {    
    $scope.db_list = MongoDB.query();
    
    $scope.test = function(dbname) {    
        console.log('run test');
        MongoDB.get({database: dbname}, function(db) {
            $scope.selected_db = db.collections.db_name;            
        });        
        $scope.showCollectionPage = false;
        $scope.showDatabasePage = true;         
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
            $scope.document_list = db.documents;
            console.log(db);                   
        });
         $scope.showCollectionPage = true;
         $scope.showDatabasePage = false;         
    };
    
    $scope.delete_collection = function(selected_db, selected_collection ) {                
        MongoDB.delete({database: selected_db,collection:selected_collection}, function(status) {            
            console.log(status);
            if(status.success) {
               $scope.db_list = MongoDB.query(); 
               $scope.showCollectionPage = false;
               $scope.showDatabasePage = true;         
            }            
        });
    };
    
    $scope.rename_collection = function() {
        
        console.log('rename collection :'+$scope.new_collection +'  on '+$scope.selected_db);         
        MongoDB.rename_collection({
            database: $scope.selected_db, 
            collection:$scope.selected_collection, 
            rename_collection:$scope.new_collection}, function(status){
            if(status.success) {
                $scope.selected_collection = $scope.new_collection;
                $scope.db_list = MongoDB.query(); 
            }
        });

        
    };    
}
