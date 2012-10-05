var app = angular.module('mongogui', ['mongo_service','mongo_stats_service','gridstore_service','ace']);

app.config(function($routeProvider) {
  $routeProvider.when('/csv',{
    controller:UploadController, 
    templateUrl:'static/csv/csv_list.html'
  });

  $routeProvider.when('/collections/:collection', {
    controller:CollectionController, 
    templateUrl:'static/collection.html'
  });

  $routeProvider.when('/', {
    controller:DBController, 
    templateUrl:'static/database.html'
  });
});

function CollectionController($scope, $routeParams, MongoDB, MongoStats) {
  $scope.name = $routeParams.collection;

  $scope.stats = MongoStats.get({collection:$routeParams.collection});
  
  $scope.totalPage = function() {
    return Math.ceil($scope.stats.count/$scope.limit);
  }

  $scope.currentPage = function() {
    return Math.ceil(($scope.skip+1)/$scope.limit);
  }

  $scope.fields = function() {
    var str = {};
    for(var idx in $scope.attributes) {
      if($scope.attributes[idx].hide) {
        str[$scope.attributes[idx].name]=0;
      }
    }
    return JSON.stringify(str);
  };
   
  $scope.$watch('skip',function() {
    $scope.query();
  });

  $scope.$watch('limit',function() {
    $scope.query();
  });
  
  
  $scope.query = function() {
    if(!$scope.query_str) {
      $scope.query_str = '{}';
    }
    MongoDB.query({
      collection:$routeParams.collection,
      query:$scope.query_str,
      skip:$scope.skip,
      limit:$scope.limit,
      fields:$scope.fields()
    },function(docs) { 
      $scope.collection = docs;
      $scope.attributes=[];
      $scope.documents=[];
      angular.forEach(docs, function(doc,idx) {
        $scope.documents.push(doc);
        angular.forEach(doc, function(value, key) {
          var found=false;
          for(var idx in $scope.attributes) {
            if($scope.attributes[idx].name == key) {
              found=true;
              break;
            }
          }
          if(!found) {
            $scope.attributes.push({'name':key,'hide':false});
          }
        });
      });
    });
  }
}

function DBController($scope, $routeParams, MongoStats) {
  $scope.db = MongoStats.get(function(result) {
    console.log(result);
  });
};


function UploadController($scope,GridStore) {
  $scope.file_list = GridStore.query({database:'mydb'});
  console.log($scope.file_list);

  $('iframe#upload_target').load(function() {
    var data = $.parseJSON($('iframe#upload_target').contents().find("body")[0].innerHTML);
    if(data.success) {
      $scope.$apply(function(){
        $scope.success = true;
      });
    } else {
      $scope.$apply(function() {
        $scope.success = false;
        $scope.message = data.message;
      });
    }
  });

  $scope.setFile = function(element) {
    $scope.$apply(function() {
      $scope.theFile = element.files[0];
    });
  };
};
