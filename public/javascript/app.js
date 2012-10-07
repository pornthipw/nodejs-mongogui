var app = angular.module('mongogui', ['mongo_service','mongo_stats_service','gridstore_service','ace']);

app.filter('skip', function() {
  return function(input, start) {
    start=+start;
    if(input) {
      return input.slice(parseInt(start));
    }
  }
});

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
  var self=this;
  var currentDocument = undefined;
  $scope.currentPage = 0;
  $scope.limit = 20;
  $scope.name = $routeParams.collection;
  $scope.stats = MongoStats.get({collection:$routeParams.collection});
  $scope.fields = function() {
    var str = {};
    for(var idx in $scope.attributes) {
      if($scope.attributes[idx].hide) {
        str[$scope.attributes[idx].name]=0;
      }
    }
    return JSON.stringify(str);
  };
  
  $scope.add = function() {
    $scope.document = undefined;
  }

  $scope.get = function(doc) {
    MongoDB.get({
      collection:$routeParams.collection,
      document:doc._id
    },function(result) {
      console.log(result);
      angular.copy(result, doc);
    });
  };
  
  $scope.edit_document = function(doc) {
    self.currentDocument = doc;
    $scope.save_result = undefined;
    $scope.document = doc;
    $scope.document_str = JSON.stringify(doc);
  }

  $scope.save_document = function() {
    if(!$scope.document) {
      MongoDB.save({
        collection:$routeParams.collection,
      },JSON.parse($scope.document_str),function(result) { 
        $scope.save_result = result;
      });
    } else {
      MongoDB.update({
        collection:$routeParams.collection,
        document:$scope.document._id
      }, angular.extend({}, 
        JSON.parse($scope.document_str),
        {_id:undefined}), function(result) {
        $scope.save_result = result;
        if(result.ok) {
          var obj = angular.extend({},JSON.parse($scope.document_str),{_id:$scope.document._id});
          angular.copy(obj,self.currentDocument);
        }
      });
    }
  }
  
  $scope.query = function() {
    console.log('query');
    if(!$scope.query_str) {
      $scope.query_str = '{}';
    }
    MongoDB.query({
      collection:$routeParams.collection,
      query:$scope.query_str,
      fields:$scope.fields()
    },function(docs) { 
      $scope.documents = docs;
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
