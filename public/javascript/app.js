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

  $routeProvider.when('/csv/:collection',{
    controller:UploadController, 
    templateUrl:'static/csv_manager.html'
  });

  $routeProvider.when('/collections/:collection/schema/:id', {
    controller:SchemaController, 
    templateUrl:'static/schema.html'
  });
  
  $routeProvider.when('/collections/:collection/schema', {
    controller:SchemaListController, 
    templateUrl:'static/view_schema.html'
  });

  $routeProvider.when('/collections/:collection', {
    controller:CollectionController, 
    templateUrl:'static/collection.html'
  });

  $routeProvider.when('/', {
    controller:DBController, 
    templateUrl:'static/database.html'
  });
  
  $routeProvider.when('/schema', {
    controller:SchemaManageController, 
    templateUrl:'static/manage_schema.html'
  });
  
  $routeProvider.when('/query', {
    controller:CollectionController, 
    templateUrl:'static/query.html'
  });
  
});


function SchemaManageController($scope, $routeParams, MongoDB) {
  var self = this;
  if (!$routeParams.collection) {
    $routeParams.collection = "person";
  } else {
    $routeParams.collection
  }
  $scope.table_schemas = MongoDB.query({
    collection:$routeParams.collection,
    query:'{"type":"tb_schema"}'
  });
    
  $scope.fields = function() {
    var str = {};
    for(var idx in $scope.attributes) {
      if($scope.attributes[idx].hide) {
        str[$scope.attributes[idx].name]=0;
      }
    }
    return JSON.stringify(str);
  };
  
  $scope.schema = {
    fields:[]
  };
  
  $scope.schema_fields = [];
  
  $scope.add_field = function() {    
    $scope.schema.fields.push({'name':'', 'title':''});
    
    //$scope.schema({
    //  name:'',
    //  title:''
   // });
    //console.log($scope.schema_fields);
  }
  
  $scope.edit_field = function (document_id) {
    console.log(document_id);
    $scope.current_id = document_id;
    var self=this;
    MongoDB.get({
      collection:$routeParams.collection,
      document:document_id}, function(schema) {
        $scope.schema = schema;
        console.log(schema);
      });
    
  };
  
  $scope.del_field = function(idx) {
    $scope.schema.fields.splice(idx,1);
    //$scope.schema_fields.splice(idx,1);
  }
  
  $scope.create_schema = function () {
    console.log($scope.schema);
    console.log($scope.current_id);
    if (!$scope.current_id) {
      MongoDB.save({
        collection:$routeParams.collection,
      },$scope.schema,function(result) { 
        console.log(result);
      });
    } else {
      console.log("update");
      MongoDB.update({
        collection:$routeParams.collection,
        document:$scope.current_id
      }, angular.extend({}, 
        $scope.schema,
        {_id:undefined}), function(result) {
        $scope.save_result = result;
        if(result.ok) {
          var obj = angular.extend({},$scope.schema,{_id:$scope.current_id});
          angular.copy(obj,self.currentDocument);
        }
      });
      
    }
    $scope.table_schemas = MongoDB.query({
    collection:$routeParams.collection,
    query:'{"type":"tb_schema"}'
  });
  };
  
}

function SchemaController($scope, $routeParams, MongoDB) {
  var self=this;
  MongoDB.get({
    collection:$routeParams.collection,
    document:$routeParams.id}, function(schema) {
    $scope.schema = schema;
    console.log(schema);
    MongoDB.query({collection:$routeParams.collection}, function(docs) {
      // filter
      $scope.doc_list = [];
      angular.forEach(docs, function(doc,key) {
        var at_least_one = false;
        angular.forEach(schema.fields, function(name, field) {
          if(!at_least_one && doc[field]) {
            at_least_one = true;
            $scope.doc_list.push(doc);
          }
        });
      });
    });
  });
  
}

function SchemaListController($scope, $routeParams, MongoDB) {
  
  var self=this;
  if(!$scope.query_str) {
      $scope.query_str = '{}';
    }
    MongoDB.query({
      collection:$routeParams.collection,
      query:$scope.query_str,
      fields:$scope.fields()
    },function(docs) { 
      $scope.documents = docs;
      //nook
      var schema_dict = {};
      angular.forEach(docs, function(v, i) {
        if(v) {
          angular.forEach(v, function(name, field) {
            var id = field;
            if(!(id in schema_dict)) {
              schema_dict[id] = {'name':id, 'fields':[],'count':0};
            }        
            schema_dict[id]['fields'].push(field);
            schema_dict[id]['count']++;
            //console.log(schema_dict[id]['count']);
          });
        } 
      });
      //console.log(schema_dict);
      $scope.schema_list = schema_dict;
    });
    
}

function CollectionController($scope, $routeParams, MongoDB, MongoStats) {
  var self=this;
  var currentDocument = undefined;
  if (!$routeParams.collection) {
    $routeParams.collection = "person";
  } else {
    $routeParams.collection
  }
  
  $scope.currentPage = 0;
  $scope.limit = 20;
  $scope.name = $routeParams.collection;
  $scope.stats = MongoStats.info({collection:$routeParams.collection});

  $scope.fields = function() {
    var str = {};
    for(var idx in $scope.attributes) {
      if($scope.attributes[idx].hide) {
        str[$scope.attributes[idx].name]=0;
      }
    }
    return JSON.stringify(str);
  };

  $scope.table_schemas = MongoDB.query({
      collection:$routeParams.collection,
      query:'{"type":"tb_schema"}'
  });
    
  
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

  $scope.remove = function(doc) {
    MongoDB.delete({
      collection:$routeParams.collection,
      document:doc._id
    },function(result) {
      console.log(result);
      if(result.ok) {
        $scope.stats.count-=1;
        for(var i=0;i<$scope.documents.length;i++) {
          if($scope.documents[i]._id==doc._id) {
            $scope.documents.remove(i); 
            break;
          }
        }
      }
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
        if(result.ok) {
          $scope.stats.count+=1;
        }
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
    if(!$scope.query_str) {
      $scope.query_str = '{}';
    }
    MongoDB.query({
      collection:$routeParams.collection,
      query:$scope.query_str,
      fields:$scope.fields()
    },function(docs) { 
      $scope.documents = docs;
      //nook
      var schema_dict = {};
      angular.forEach(docs, function(v, i) {
        if(v) {
          angular.forEach(v, function(name, field) {
            var id = field;
            if(!(id in schema_dict)) {
              schema_dict[id] = {'name':id, 'fields':[],'count':0};
            }        
            schema_dict[id]['fields'].push(field);
            schema_dict[id]['count']++;
            //console.log(schema_dict[id]['count']);
          });
        } 
      });
      console.log(schema_dict);
      $scope.schema_list = schema_dict;
     
    });
  }
}

function DBController($scope, $routeParams, MongoStats) {
  $scope.db = MongoStats.info();
};


function UploadController($scope,$routeParams,MongoDB) {
  $('iframe#upload_target').load(function() {
    var data = $.parseJSON($('iframe#upload_target').contents().find("body")[0].innerHTML);
    if(data.success) {
      $scope.$apply(function(){
        $scope.success = true;
        var col_length = 0;
        for(var row in data.csv) {
          if(data.csv[row].length > col_length) {
            col_length = data.csv[row].length;
          }
        }
        data.col_names = [];
        for(var i=0;i<col_length;i++) { 
          data.col_names.push({name:'col'+i});
        }
        $scope.result = data;
        console.log($scope.result);
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
  
  $scope.save = function() {
    var obj_list = [];
    for(var row=0;row<$scope.result.csv.length;row++) {
      var obj = {};
      if($scope.result.csv[row].exclude) continue;
      for(var col=0;col<$scope.result.csv[row].length;col++) {
        var current = $scope.result.col_names[col];
        if(!current.exclude) {
          console.log($scope.result.csv);
          console.log('Row :'+row);
          console.log('Col :'+col);
          console.log(' :'+$scope.result.csv[row].length);
 
          obj[current.name] = $scope.result.csv[row][col].value;
        }
      }
      obj_list.push(obj);
    }
    console.log($scope.result);
    console.log(obj_list);

    for(var i=0;i<obj_list.length;i++) {
      MongoDB.save({
        collection:$routeParams.collection,
      },obj_list[i],function(result) { 
        if(result.ok) {
          $scope.document_saved+=1;
        }
      });
    }
  }
};

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
