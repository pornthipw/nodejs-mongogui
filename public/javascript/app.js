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
  
  $routeProvider.when('/schema/create', {
    controller:SchemaCreateController, 
    templateUrl:'static/schema_create.html'
  });
  
  $routeProvider.when('/manager', {
    controller:SchemaManageController, 
    templateUrl:'static/schema_manager.html'
  });
  
  $routeProvider.when('/manager/:id', {
    controller:SchemaManageController, 
    templateUrl:'static/schema_manager.html'
  });

  $routeProvider.when('/schema/:id', {
    controller:SchemaController, 
    templateUrl:'static/schema.html'
  });
  
  $routeProvider.when('/schema/edit/:id', {
    controller:SchemaController, 
    templateUrl:'static/schema.html'
  });

  $routeProvider.when('/query', {
    controller:QueryController, 
    templateUrl:'static/query.html'
  });
  
  $routeProvider.when('/role', {
    controller:RoleController, 
    templateUrl:'static/role_manager.html'
  });
  
  
});


function UserCtrl($scope, User, Logout) {
  $scope.user = User.get();
  
  $scope.logout = function(){
    Logout.get(function(response){
      if(response.success){
        $scope.user = null;
        $scope.$broadcast('logout');
      }
    });
  };
}

function RoleController($scope, Role, User, Logout, Admin) {   
  var orig = null;
  $scope.users = Admin.query();
  $scope.get_user = function(id) {
    Admin.get({'id':id}, function(user) {
      var ng_role = [];
      $scope.user = user;//user is object, array
      orig = user;// ???
      if(user['role']) { //found
        angular.forEach(user.role, function(value, idx) {
          ng_role.push({'name':value});//??
        });
      }
      $scope.user['role'] = ng_role; // not found
    });
  };

  $scope.update = function() {
    var db_role = [];
    angular.forEach($scope.user.role, function(value, idx) {
      db_role.push(value.name);
    });
    orig['role'] = db_role;// ?? origin -- new user
    
    var doc = angular.extend({}, orig, {_id:undefined});
    //console.log(doc);
    Admin.update({'id':orig._id}, doc, function(response) { 
      console.log(response);
      if(response.success) {
        $scope.get_user(orig._id);
      }
    });
  };
  
}

function SchemaListController($scope, MongoDB, $location) {
  $scope.schemas = MongoDB.query({query:'{"type":"tb_schema"}'});
  $scope.load_schema = function(id) {
    $scope.d_schema = null;
    $scope.c_schema = id;
    $location.path('/schema/edit/'+id);
  };
  
  $scope.manage_schema = function() {
    $scope.c_schema = null;
    $scope.c_schema = 1;
    $location.path('/manager');
  };
};


function SchemaController($scope, $routeParams, $location, MongoDB,User, Logout) {   
   $scope.limit = 10;
   MongoDB.get({id:$routeParams.id}, function(schema) {
     $scope.schema = schema;
     $scope.currentPage = 0;
     var query_str = {"$or":[]};
     angular.forEach(schema.fields, function(field, index) {
       var c_field = {};
       c_field[field.name] = {"$exists":true};
       query_str["$or"].push(c_field);
     });
     $scope.document_list = MongoDB.query({
       query:JSON.stringify(query_str)
     });
   });
   
    $scope.query = function() {
      var q = [];    
      angular.forEach($scope.schema.fields, function(field, idx) {              
        var tmp = {};
        if($scope.query_str) {        
          tmp[field.name] = {'$regex':$scope.query_str};
        } else {
          tmp[field.name] = {'$regex':'.'};
        }        
        q.push(tmp);      
      });
      
      MongoDB.query({    
        query:JSON.stringify({'$or':q})
      }, function(res) {
        $scope.currentPage = 0;
        $scope.document_list = res;
      });
    };
  
   $scope.document_selected = function() {
     $scope.selected_docs = [];
     angular.forEach($scope.document_list, function(doc, idx) {
       if(doc._ng_selected) {
         $scope.selected_docs.push(doc);
       }
     });
   };
   
   $scope.select_doc = function(doc) {
     MongoDB.get({id:doc._id}, function(result) {            
       console.log(result);       
     });      
   };
   
    $scope.del_element = function () {      
      angular.forEach($scope.selected_docs, function(doc, idx) {                
        MongoDB.delete({id:doc._id}, function(result) {
          if(result.success) {
            var r_idx = $scope.document_list.indexOf(doc);
            $scope.document_list.splice(r_idx, 1);
          }
        });                      
      });      
    };
    
     //$scope.schemas = MongoDB.query({query:'{"type":"tb_schema"}'});

}

function SchemaOldController($scope, $routeParams, MongoDB, $location) {
  var self=this;
  var currentDocument = undefined;
  $scope.currentPage = 0;
  $scope.limit = 20;

  $scope.query = function() {
    MongoDB.get({id:$routeParams.id}, function(schema) {
      $scope.schema = schema;
      var query_obj = {"$or":[]};
      angular.forEach(schema.fields, function(field, index) {
        var c_field = {};
        if($scope.query_str) {
          c_field["$and"] = [];
          var c1 = {};
          c1[field.name] = {"$exists":true};
          var c2 = {};
          c1[field.name] = {"$regex":$scope.query_str};
          c_field["$and"].push(c1);
          c_field["$and"].push(c2);
        } else {
          c_field[field.name] = {};
          c_field[field.name]["$exists"] = true;
        }
        query_obj["$or"].push(c_field);
      });
    
      console.log(query_obj);
      $scope.document_list = MongoDB.query({
        query:JSON.stringify(query_obj)
      }, function(res) {
        console.log(res.length);
        $scope.length_of_schema = res.length;
      });
    });
  };

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
        $location.path('/');
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
        $location.path('/');
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
      $location.path('/manager');
    });
  };
  
   $scope.del_field = function(idx) {
    $scope.schema.fields.splice(idx,1);
  }
  
}

function SchemaManageController($scope, $routeParams, MongoDB, $location) {
  var self = this;
  $scope.cur_id=$routeParams.id;
  if ($routeParams.id) {
  MongoDB.get({
      id:$routeParams.id
    },function(schema) {
      $scope.schema = schema;
      //console.log("test"+schema.name);
    });
  }

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
    type:"tb_schema",
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
      id:document_id}, function(schema) {
        $scope.schema = schema;
        console.log(schema);
      });
  };
  
  $scope.del_field = function(idx) {
    $scope.schema.fields.splice(idx,1);
    //$scope.schema_fields.splice(idx,1);
  }

  $scope.save = function () {
    console.log($scope.schema);
    console.log($scope.current_id);
    //if (!$scope.current_id) {
    if (!$routeParams.id){
      MongoDB.save($scope.schema,function(result) { 
        console.log(result);
      });
    } else {
      console.log("update");
      MongoDB.update({
        id:$routeParams.id
      }, angular.extend({}, 
        $scope.schema,
        {_id:undefined}), function(result) {
        $scope.save_result = result;
        if(result.success) {
          var obj = angular.extend({},$scope.schema,{_id:$routeParams.id});
          angular.copy(obj,self.currentDocument);
          $location.path('/manager');
        }
      });
      
    }
    $scope.table_schemas = MongoDB.query({
      collection:$routeParams.collection,
      query:'{"type":"tb_schema"}'
    });
  };
  
  $scope.remove = function() {
    MongoDB.delete({
      id:$routeParams.id
    },function(result) {
      console.log(result);
      if(result.success) {
        for(var i=0;i<$scope.schema.length;i++) {
          if($scope.schema[i]._id==$routeParams.id) {
            $scope.schema.remove(i); 
            break;
          }
        }
        $location.path('/manager');
      }
    });
  };
  
}

function QueryController($scope, $routeParams, MongoDB, User, Logout) {
  var self=this;
  var currentDocument = undefined;

  MongoDB.query({    
    query:'{"type":"tb_schema"}'
  }, function(schema_list) {
    var fields = [];
    $scope.select_fields = [];
    angular.forEach(schema_list, function(schema, index) {
      angular.forEach(schema.fields, function(field) {
        if(fields.indexOf(field.name) == -1) {
          fields.push(field.name);
        }
      });
    });

    angular.forEach(fields, function(field) {
      $scope.select_fields.push({'name':field,'selected':false});
    });
  });  

  $scope.merge = function() {
    console.log($scope.merge_doc);
  };

  $scope.select_merge = function() {
    $scope.merge_doc = {};
    var target_doc = {};
    angular.forEach($scope.result_list, function(doc, idx) {
      if(doc._ng_selected) {
        angular.forEach(doc, function(value,key) {
          if(!key.match(/^_/)) {
            if(!target_doc[key]) {
              target_doc[key] = [];
              $scope.merge_doc[key] = value;
            }
            if(target_doc[key].indexOf(value) == -1) {
              target_doc[key].push(value);
            }
          }
        });
      }
    });
    $scope.merge_tmp = target_doc;
    console.log(target_doc);
  };

  $scope.query = function() {
    var q = [];
    $scope.selected_fields = [];
    angular.forEach($scope.select_fields, function(field, idx) {
      if(field.selected) { 
        var tmp = {};
        if($scope.query_str) {
          tmp[field.name] = {'$regex':$scope.query_str};
        } else {
          tmp[field.name] = {'$regex':'.'};
        }
        $scope.selected_fields.push(field.name);
        q.push(tmp);
      }
    });

    MongoDB.query({    
      query:JSON.stringify({'$or':q})
    }, function(res) {
      $scope.result_list = res;
    });
  };
  
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
}

function UploadController($scope,$routeParams,MongoDB) {  
  
  MongoDB.get({id:$routeParams.schema}, function(schema) {
    $scope.schema = schema;
    console.log(schema);
  });
  
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
          data.col_names.push({field:{name:'col'+i}});
        }
        $scope.result = data;
        console.log($scope.result);
      });
    } else {
      console.log(data);
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
          //console.log($scope.result.csv);
          //console.log('Row :'+row);
          //console.log('Col :'+col);
          //console.log(' :'+$scope.result.csv[row].length);
          if(current.field.title) {
            obj[current.field.name] = $scope.result.csv[row][col].value;
            $scope.result.csv[row]['_obj'] = obj;
          }
        }
      }
      obj_list.push(obj);
    }
    //console.log($scope.result);
    //console.log(obj_list);
    
    angular.forEach(obj_list, function(obj, idx) {
      MongoDB.save({}, obj, function(result) {
         if(result.success) {
          angular.forEach($scope.result.csv, function(row, idx) {
            console.log(row);
            if(row._obj == obj) {
              row._saved = true;
              console.log(row);
            }
          });
          $scope.document_saved+=1;
        }
      });
    });
    /*
    for(var i=0;i<obj_list.length;i++) {
      MongoDB.save({      
      },obj_list[i],function(result) { 
        if(result.success) {
          angular.forEach($scope.result.csv, function(row, idx) {
            console.log(row);
            if(row._obj == obj_list[i]) {
              row._saved = true;
              console.log(row);
            }
          });
          $scope.document_saved+=1;
        }
      });
    }
    */
  }
};

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
