var app = angular.module('mongogui', ['mongo_service','codemirror']);

app.filter('skip', function() {
  return function(input, start) {
    start=+start;
    if(input) {
      return input.slice(parseInt(start));
    }
  }
});

app.filter('hide', function() {
  return function(input, key) {
    if(input) {
      var result = [];
      angular.forEach(input, function(v) {
        if(!v.hide) {
          result.push(v);
        }
      });
      return result;
    }
  }
});

app.config(function($routeProvider) {
  
  $routeProvider.when('/upload',{
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
  
  $routeProvider.when('/schema/:id', {
    controller:SchemaController, 
    templateUrl:'static/schema.html'
  });
  
  $routeProvider.when('/schema/edit/:id', {
    controller:SchemaController, 
    templateUrl:'static/schema.html'
  });
  
  $routeProvider.when('/document/schema/:schemaId/edit/:id', {
    controller:DocumentController, 
    templateUrl:'static/document.html'
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
     $location.path('/document/schema/'+$routeParams.id+'/edit/'+doc._id);        
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
    
}

function DocumentController($scope, $routeParams, $location, MongoDB,User, Logout) {   
  var self = this;
  self.message = function(message) {
    $scope.message = message;
    setTimeout(function() {      
      $scope.$apply(function() {
        $scope.message = null;
      });
    }, 3000);
  };
  
  $scope.document = MongoDB.get({id:$routeParams.id});  
  
  $scope.editField = function(field) {
    $scope.selectField = field;
    $scope.selectValue = $scope.document[field];
  }
  
  $scope.update = function() {
    $scope.document[$scope.selectField] = $scope.selectValue;
    MongoDB.update({
      id:$routeParams.id
    }, angular.extend({}, $scope.document, {_id:undefined}), function(result) {      
      if(result.success) {
        self.message("Document Saved");                
      }
    });
  }   

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

function SchemaManageController($scope, MongoDB) {
  var self = this;
  
  $scope.select_schema = function(doc) {
    $scope.schema = doc;
    $scope.current_action = null;
  }

  $scope.schema_list = MongoDB.query({  
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
  
  $scope.init_action = function() {
    if(!$scope.schema.actions) {
      $scope.schema.actions = [];
    }
    $scope.schema.actions.push({name:'New Action'});
  };
  
  $scope.init_schema = function() {
    var tmp_schema = {
      type:"tb_schema",
      fields:[]
    };
    MongoDB.save({  
    },tmp_schema,function(result) { 
      if(result.success) {
        MongoDB.get({id:result._id}, function(res) {
          $scope.schema = res;
        });
      }
    });
  };

  $scope.add_field = function() {    
    $scope.schema.fields.push({'name':'', 'title':''});
  }
  
  $scope.edit_field = function (document_id) {
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
  }

  $scope.save = function() {
    MongoDB.update({
      id:$scope.schema._id
    }, angular.extend({},$scope.schema,{_id:undefined}), function(result) {
      if(result.success) {
        $scope.schema_list = MongoDB.query({  
          query:'{"type":"tb_schema"}'
        });
      }
    });
  };
  
  $scope.remove = function() {
    MongoDB.delete({
      id:$scope.schema._id
    },function(result) {
      if(result.success) {
        for(var i=0;i<$scope.schema_list.length;i++) {
          if($scope.schema_list[i]._id==$scope.schema._id) {
            $scope.schema_list.remove(i); 
            break;
          }
        }
        $scope.schema = null;
      }
    });
  };
  
}

function UploadController($scope,MongoDB) {  
  $scope.limit = 50;
  MongoDB.query({query:'{"type":"tb_schema"}'},function(result) {
    var schema_list = result;
    var fields = {};
    $scope.field_list = [];
    angular.forEach(schema_list,function(schema,idx) {
      angular.forEach(schema.fields, function(field, i) { 
        if(!(field.name in fields)) {
          fields[field.name]=[];
        }
        if(fields[field.name].indexOf(field.title) == -1) {
          fields[field.name].push(field.title);
          $scope.field_list.push(field);
        }
      });
    });
    console.log($scope.field_list);
  });
  
  $('iframe#upload_target').load(function() {
    var data = $.parseJSON($('iframe#upload_target').contents().find("body")[0].innerHTML);
    if(data.success) {
      $scope.$apply(function(){
        console.log(data);
        $scope.success = true;
        var col_length = 0;
        angular.forEach(data.csv, function(row, idx) {
          if(row.length > col_length) {
            col_length = row.length;
          }
        });
        data.col_names = [];
        for(var i=0;i<col_length;i++) { 
          data.col_names.push({field:{name:'col'+i}});
        }
        $scope.result = data;
        /*
        $scope.orig_result = {'csv':data.csv};
        $scope.result = {'col_names':data.col_names};
        if(data.csv.length > 100) {
          $scope.result['csv'] = data.csv.slice(0,50)};
        }
        */
      });
    } else {
      $scope.$apply(function() {
        $scope.success = false;
        $scope.message = data.message;
      });
    }
  });


  $scope.hide_col = function(col) {
    var col_idx = $scope.result.col_names.indexOf(col);
    angular.forEach($scope.result.csv, function(row, idx) {
      row[col_idx].hide = col.hide;
    });
  };

  $scope.setFile = function(element) {
    $scope.$apply(function() {
      $scope.theFile = element.files[0];
    });
  };
  
  
  $scope.del_element = function () {   
    angular.forEach($scope.result.csv, function(doc, idx) { 
      if(doc._ng_selected) {
        doc.hide=true;
      }
    });      
  };
  
  $scope.save = function() {
    var obj_list = [];
    angular.forEach($scope.result.csv, function(row,r_idx) {
      var obj = {};
      if(!row.hide) {
        angular.forEach($scope.result.col_names, function(col,c_idx) {
          if(!col.hide) {
            obj[col.field.name] = row[c_idx].value;
          }
        });
        obj_list.push(obj);
      }
    });
    
    angular.forEach(obj_list, function(obj, idx) {
      MongoDB.save({}, obj, function(result) {
         if(result.success) {
          angular.forEach($scope.result.csv, function(row, idx) {
            if(row._obj == obj) {
              row._saved = true;
            }
          });
          $scope.document_saved+=1;
        }
      });
    });
  }
};

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
