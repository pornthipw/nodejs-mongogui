var app = angular.module('mongogui', ['mongo_service','ace']);

app.filter('skip', function() {
  return function(input, start) {
    start=+start;
    if(input) {
      return input.slice(parseInt(start));
    }
  }
});

app.config(function($routeProvider) {

  $routeProvider.when('/csv/:schema',{
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
  
  $routeProvider.when('/schema/list', {
    controller:SchemaListController, 
    templateUrl:'static/schema_list.html'
  });
  
  $routeProvider.when('/schema/edit/:id', {
    controller:SchemaController, 
    templateUrl:'static/schema.html'
  });
  
  $routeProvider.when('/schema/create', {
    controller:SchemaCreateController, 
    templateUrl:'static/schema.html'
  });
  
  $routeProvider.when('/query', {
    controller:CollectionController, 
    templateUrl:'static/query.html'
  });
  
});

function UserCtrl($scope, User, Logout) {
  $scope.user = User.get(function(response) {
  });
  
  $scope.logout = function(){
    Logout.get(function(response){
      if(response.success){
        $scope.user = null;
        $scope.$broadcast('logout');
      }
    });
  };
}

function SchemaListController($scope, $routeParams, MongoDB,User, Logout) {   
  
  $scope.user = User.get(function(response) {
    console.log(response);
    if (response.user) {
      $scope.table_schemas = MongoDB.query({    
        query:'{"type":"tb_schema"}'
      }, function(res) {
        console.log(res);
      });  
      $scope.user_n = response.user;
    }
  });
 
}

function SchemaController($scope, $routeParams, MongoDB, $location) {
  var self=this;
  var currentDocument = undefined;
  $scope.currentPage = 0;
  $scope.limit = 20;

      

  MongoDB.get({id:$routeParams.id}, function(schema) {
    $scope.schema = schema;
    var query_str = {"$or":[]};
    angular.forEach(schema.fields, function(field, index) {
      var c_field = {};
      c_field[field.name] = {"$exists":true};
      query_str["$or"].push(c_field);
    });
    //console.log(JSON.stringify(query_str));
    
    $scope.document_list = MongoDB.query({
      query:JSON.stringify(query_str)
    }, function(res) {
      console.log(res.length);
      $scope.length_of_schema = res.length;
    });
    
  });

  $scope.add_field = function() { 
    console.log("add_field");
    $scope.schema.fields.push({'name':'', 'title':''});
  }
  
  $scope.save = function () {		
    MongoDB.update({      
      id:$routeParams.id
    }, angular.extend({}, $scope.schema,
      {_id:undefined}), function(result) {
      $scope.save_result = result;
      if(result.ok) {        
        $location.path('/schema/list');
      } else {
        console.log("not");
      }
    });            
  };
  
  $scope.del_field = function(idx) {
    $scope.schema.fields.splice(idx,1);    
  }
  
  $scope.del_document = function(){
    MongoDB.delete({
      id:$routeParams.id
    },function(result) {            
      if(result.ok) {        
        $location.path('/schema/list');
      }
    });
  };

}

function SchemaCreateController($scope, $routeParams, MongoDB, $location) {
  var self=this;
  
  $scope.schema = {
    type:"tb_schema",
    fields:[]
  };
  
  $scope.add_field = function() {    
    $scope.schema.fields.push({'name':'', 'title':''});
  }
  
  $scope.save = function () {
    MongoDB.save({  
    },$scope.schema,function(result) { 
      console.log(result);
      $location.path('/schema/list');
    });
  };
  
   $scope.del_field = function(idx) {
    $scope.schema.fields.splice(idx,1);
  }
  
}

function SchemaManageController($scope, $routeParams, MongoDB) {
  var self = this;
  
  $scope.table_schemas = MongoDB.query({  
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
  
  $scope.add_field = function() {    
    $scope.schema.fields.push({'name':'', 'title':''});
  }
  
  $scope.edit_field = function (document_id) {
    console.log(document_id);
    $scope.current_id = document_id;
    var self=this;
    MongoDB.get({
      collection:$routeParams.collection,
      id:document_id}, function(schema) {
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
        id:$scope.current_id
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

function CollectionController($scope, $routeParams, MongoDB, User, Logout) {
  var self=this;
  var currentDocument = undefined;
  
  $scope.currentPage = 0;
  $scope.limit = 20;
  $scope.name = $routeParams.collection;
  //$scope.stats = MongoStats.info({collection:$routeParams.collection});
  
  
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
      id:doc._id
    },function(result) {
      console.log(result);
      angular.copy(result, doc);
    });
  };

  $scope.remove = function(doc) {
    MongoDB.delete({
      collection:$routeParams.collection,
      id:doc._id
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
        id:$scope.document._id
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

function DBController($scope, $routeParams) {
  //$scope.db = MongoStats.info();
};

function UploadController($scope,$routeParams,MongoDB) {
  $('iframe#upload_target').load(function() {
    var data = $.parseJSON($('iframe#upload_target').contents().find("body")[0].innerHTML);
    if(data.success) {
      MongoDB.get({id:$routeParams.schema}, function(schema) {
        $scope.schema = schema;
        console.log(schema);
      });
      
      
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
          data.col_names.push({field:{name:'col'+i}});
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
          if(current.field.title) {
            obj[current.field.name] = $scope.result.csv[row][col].value;
          }
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
