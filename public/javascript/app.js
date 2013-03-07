var app = angular.module('mongogui', [
  'mongo_service',
  'dynamicTemplate',
  'codemirror']);

app.filter('toXML', function() {
  return function(result,type) {
    var str = '<?xml version="1.0"?>';
    str+='<rows>';
    
    angular.forEach(result, function(row) {
      str+='<'+type+' id="'+row._id+'">';
      angular.forEach(row.value, function(value,key) {
        str+='<'+key+'>'+value;
        str+='</'+key+'>'
      });
      str+='</'+type+'>';
    });
    str+='</rows>';
    return vkbeautify.xml(str,'  ');
  };
});

app.run(function($rootScope,$location) {
  $rootScope.location = $location;
});

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
  $routeProvider.when('/csv',{
    controller:CsvListController, 
    templateUrl:'static/csv/index.html'
  });

  $routeProvider.when('/csv/view/:id',{
    controller:CsvViewController, 
    templateUrl:'static/csv/view.html'
  });

  $routeProvider.when('/csv/upload',{
    controller:CsvUploadController, 
    templateUrl:'static/csv/upload.html'
  });

  $routeProvider.when('/csv/:id',{
    controller:CsvController, 
    templateUrl:'static/csv/main.html'
  });

  $routeProvider.when('/plugin',{
    controller:PluginController, 
    templateUrl:'static/plugin.html'
  });

  $routeProvider.when('/function',{
    controller:FunctionController, 
    templateUrl:'static/function.html'
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
  
  $routeProvider.when('/', {
   // controller:CsvListController, 
   // templateUrl:'static/csv/index.html'
    controller:MainController, 
    templateUrl:'static/index.html'
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

function SchemaListController($scope, Entry, $location) {
  $scope.schemas = Entry.query({query:'{"type":"tb_schema"}'});
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

function SchemaController($scope, $routeParams, $location, Entry,User,MapReduce,Logout) {   
  $scope.limit = 10;

  Entry.get({id:$routeParams.id}, function(schema) {
    $scope.schema = schema;
    $scope.currentPage = 0;
    /*
    var query_str = {"$or":[]};
    angular.forEach(schema.fields, function(field, index) {
      var c_field = {};
      c_field[field.name] = {"$exists":true};
      query_str["$or"].push(c_field);
    });
    */
    console.log(schema);
    var query_str = {"schema":schema._id};
    $scope.document_list = Entry.query({
      query:JSON.stringify(query_str)
    });
  });
  
  $scope.execute_action = function(action) {
    MapReduce.query({},{map:action.map, reduce:action.reduce},function(res) {
      console.log(res);
      if(res.success) {
        $scope.action_result = res.result;
        console.log(action.template);
        $scope.action_template = action.template;
        $scope.show_action = true;
      }
    });
  };
   
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
    
    Entry.query({    
      query:JSON.stringify({'$and':[{'$or':q},{'schema':$scope.schema._id}]})
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
        Entry.delete({id:doc._id}, function(result) {
          if(result.success) {
            var r_idx = $scope.document_list.indexOf(doc);
            $scope.document_list.splice(r_idx, 1);
          }
        });                      
      });      
    };
    
}

function DocumentController($scope, $routeParams, $location, Entry,User, Logout) {   
  var self = this;
  self.message = function(message) {
    $scope.message = message;
    setTimeout(function() {      
      $scope.$apply(function() {
        $scope.message = null;
      });
    }, 3000);
  };
  
  $scope.document = Entry.get({id:$routeParams.id});  
  
  $scope.editField = function(field) {
    $scope.selectField = field;
    $scope.selectValue = $scope.document[field];
  }
  
  $scope.update = function() {
    $scope.document[$scope.selectField] = $scope.selectValue;
    Entry.update({
      id:$routeParams.id
    }, angular.extend({}, $scope.document, {_id:undefined}), function(result) {      
      if(result.success) {
        self.message("Document Saved");                
      }
    });
  }   

}

function MainController($scope, Entry,MapReduce) {
  var self = this;
  
  self.message = function(message) {
    $scope.message = message;
    setTimeout(function() {      
      $scope.$apply(function() {
        $scope.message = null;
      });
    }, 3000);
  };
  
  
  $scope.plugin_list = Entry.query({
    query:'{"type":"plugin_entry"}'
  });
  
  $scope.execute = function(plugin) {
    $scope.current_id = plugin._id;
    MapReduce.query({},{
      map:plugin.map,
      reduce:plugin.reduce
    }, function(res) {
      if(res.success) {
        $scope.plugin_result = res.result;
        $scope.show_action = true;
        $scope.plugin_template = plugin.template;
      } else {
        console.log(res);
        //$scope.message = res.message;
        self.message(res.message);   
      }
       
    });
  }
}

function FunctionController($scope, Entry) {
  var self = this;
  
  self.message = function(message) {
    $scope.message = message;
    setTimeout(function() {      
      $scope.$apply(function() {
        $scope.message = null;
      });
    }, 3000);
  };

  self.get_list = function() {
    $scope.function_list = Entry.query({
      query:'{"type":"function_entry"}'
    });
  };

  self.get_list();

  $scope.init_function = function() {
    var tmp = {'type':'function_entry',
      'name':'New Function '+$scope.function_list.length};
    Entry.save({},tmp, function(res) {
      if(res.success) {
        self.message("Function Created"); 
        self.get_list();
        $scope.current_plugin = tmp;
      } else {                
        self.message("Fail to create Function"); 
      }
      self.get_list();
    });
  };
  
  $scope.select_function = function(pi) {
    $scope.current_function = pi;
    $scope.show_action = false;
  }

  $scope.save = function() {
    Entry.update({
      id:$scope.current_function._id
    }, angular.extend({},$scope.current_function,{_id:undefined}), 
      function(result) {
        if(result.success) {
          self.message("Function Saved"); 
          self.get_list();
        } else {                
        self.message("Fail to save Function"); 
      }
      self.get_list();
    });
  };

  $scope.remove = function() {
    Entry.delete({
      id:$scope.current_function._id
    },function(result) {
      if(result.success) {
        self.message("Plugin Deleted"); 
        $scope.current_function = null;
        self.get_list();
      } else {                
        self.message("Plugin don't Deleted");   
      }
      self.get_list();
    });
  };

}

function PluginController($scope, Entry,MapReduce) {
  var self = this;
  
  self.message = function(message) {
    $scope.message = message;
    setTimeout(function() {      
      $scope.$apply(function() {
        $scope.message = null;
      });
    }, 3000);
  };
  
  self.get_list = function() {
    $scope.plugin_list = Entry.query({
      query:'{"type":"plugin_entry"}'
    });
  };
  
  self.get_list();
  
  $scope.init_plugin = function() {
    var tmp = {'type':'plugin_entry',
      'name':'New Plugin '+$scope.plugin_list.length};
    Entry.save({},tmp, function(res) {
      if(res.success) {
        self.message("Plugin Created"); 
        self.get_list();
        $scope.current_plugin = tmp;
      } else {                
        self.message("Plugin don't Created"); 
      }
      self.get_list();
    });
  };
  
  $scope.select_plugin = function(pi) {
    $scope.current_plugin = pi;
    $scope.show_action = false;
  }

  $scope.save = function() {
    Entry.update({
      id:$scope.current_plugin._id
    }, angular.extend({},$scope.current_plugin,{_id:undefined}), 
      function(result) {
        if(result.success) {
          self.message("Plugin Saved"); 
          self.get_list();
        } else {                
        self.message("Plugin don't Saved"); 
      }
      self.get_list();
    });
  };

  $scope.remove = function() {
    Entry.delete({
      id:$scope.current_plugin._id
    },function(result) {
      if(result.success) {
        self.message("Plugin Deleted"); 
        $scope.current_plugin = null;
        self.get_list();
      } else {                
        self.message("Plugin don't Deleted");   
      }
      self.get_list();
    });
  };
   
  $scope.execute = function(plugin) {
    MapReduce.query({},{
      map:plugin.map,
      reduce:plugin.reduce
    }, function(res) {
      if(res.success) {
        $scope.plugin_result = res.result;
        $scope.show_action = true;
        $scope.plugin_template = plugin.template;
      } else {
        self.message(res.message);
      }
       
    });
  }
}

function SchemaManageController($scope, Entry, Csv) {
  var self = this;
  
  self.message = function(message) {
    $scope.message = message;
    setTimeout(function() {      
      $scope.$apply(function() {
        $scope.message = null;
      });
    }, 3000);
  };
  
  $scope.document_linked = function(csv) {
    var query_str = JSON.stringify({
      query:{_csv_id:csv._id,_schema_id:$scope.schema._id}
    });
    Entry.query({query:query_str}, function(e_res) {
      $scope.linked_document= e_res.length;
    });
  };
  
  $scope.unlink_csv = function(csv) {
    var query_str = JSON.stringify({
      query:{_csv_id:csv._id,_schema_id:$scope.schema._id}
    });
 
    Entry.query({query:query_str}, function(e_res) {
      $scope.linked_document = e_res.length;
      angular.forEach(e_res, function(entry) {
        Entry.delete({id:entry._id}, function(d_res) {
          if(d_res.success) {
            $scope.linked_document -= 1;
          }
        });
      });
    });
  };

  $scope.link_csv = function(csv) {
    $scope.linked_document = 0;
    var type_map=[];
    if(!$scope.schema['csv']) {
      $scope.schema['csv']=[];
    }
    var csv_exists = false;
    var csv_exists_idx = -1;
    angular.forEach($scope.schema.csv,function(csv_o,idx) {
      if(csv_o._id == csv._id) {
        csv_exists = true; 
        csv_exists_idx = idx;
      }
    });
    
    if(csv_exists) {
      $scope.schema.csv.remove(csv_exists_idx,1);
    } 
    $scope.schema.csv.push(csv);
    Entry.update({id:$scope.schema._id},
      angular.extend({},$scope.schema,{_id:undefined}));
    
    
    angular.forEach(csv, function(value,key) {
      if(value.selected) {
        type_map.push({'from':key,'to':value.map_name});
      }
    });
    Csv.query({query:JSON.stringify({query:{raw_id:csv._id}})},function(res) {
      angular.forEach(res, function(csv_doc) {
        query_str = JSON.stringify({
          query:{_doc_id:csv_doc._id,_schema_id:$scope.schema._id}
        });
        Entry.query({query:query_str}, function(e_res) {
          if(e_res.length == 0) {
            var tmp_obj = {
              _schema_id:$scope.schema._id,
              _csv_id:csv._id, 
              _doc_id:csv_doc._id
            };
            angular.forEach(type_map, function(value) {
              tmp_obj[value.to] = csv_doc[value.from];
            });
            Entry.save({},tmp_obj,function(s_res) {
              if(s_res.success) {
                $scope.linked_document += 1;
              }
            });
          } else {
            if(e_res.length==1) {
              tmp_obj = e_res[0];
             
              angular.forEach(type_map, function(value) {
                tmp_obj[value.to] = csv_doc[value.from];
              });
              Entry.update({id:tmp_obj._id},
                angular.extend({},tmp_obj,{_id:undefined}),function(s_res) {
                if(s_res.success) {
                  $scope.linked_document += 1;
                }
              });
            } else {
              console.log('Duplicate Reture');
              console.log(e_res);
            }
          }
        });
      });
    });
  };

  $scope.get_csv_content = function(csv) {
    Csv.query({query:JSON.stringify({query:{raw_id:csv._id}})},function(res) {
      console.log(res.length);
    });
  };
  
  
  $scope.select_schema = function(doc) {
    $scope.schema = doc;
    var query_str = JSON.stringify({query:{root:true}});
    $scope.csv_list = [];
    Csv.query({query:query_str},function(res) {
      angular.forEach(res, function(csv) {
        var csv_exist = false;
        angular.forEach($scope.schema.csv, function(e_csv) {
          if(csv._id == e_csv._id) {
            angular.extend(csv,e_csv);
            $scope.csv_list.push(csv);
            csv_exist = true;
          } 
        });
        if(!csv_exist) {
          $scope.csv_list.push(csv);
        }
      });
    });
  }

  $scope.schema_list = Entry.query({  
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
    $scope.current_action = {'name':'New Action'+$scope.schema.actions.length};
    $scope.schema.actions.push($scope.current_action);
  };
  
  $scope.del_action = function(){
    var idx = $scope.schema.actions.indexOf($scope.current_action);
    $scope.schema.actions.splice(idx,1);
    $scope.current_action = null;
  };
  
  $scope.init_schema = function() {
    var tmp_schema = {
      type:"tb_schema",
      fields:[]
    };
    Entry.save({  
    },tmp_schema,function(result) { 
      if(result.success) {
        self.message("Schema Created");
        Entry.get({id:result._id}, function(res) {
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
    Entry.get({
      id:document_id}, function(schema) {
        $scope.schema = schema;
        console.log(schema);
      });
  };
  
  $scope.del_field = function(idx) {
    $scope.schema.fields.splice(idx,1);
  }

  $scope.save = function() {
    Entry.update({
      id:$scope.schema._id
    }, angular.extend({},$scope.schema,{_id:undefined}), function(result) {
      if(result.success) {
        self.message("Schema Saved");
        $scope.schema_list = Entry.query({  
          query:'{"type":"tb_schema"}'
        });
        } else {
          self.message("Schema don't Saved");
      }
        $scope.schema_list = Entry.query({  
          query:'{"type":"tb_schema"}'
        });
    });
  };
  
  $scope.remove = function() {
    Entry.delete({
      id:$scope.schema._id
    },function(result) {
      if(result.success) {
        for(var i=0;i<$scope.schema_list.length;i++) {
          if($scope.schema_list[i]._id==$scope.schema._id) {
            $scope.schema_list.remove(i); 
            break;
          }
        }
        self.message("Schema Deleted");
        $scope.schema = null;
      } else {
        self.message("Schema don't Deleted");
      }
    });
  };
}

function UploadController($scope,$routeParams,Entry) {  
  $scope.limit = 50;

  $scope.function_list = Entry.query({
    query:'{"type":"function_entry"}'
  });

  $scope.schema = Entry.get({id:$routeParams.schema_id});
  
  $scope.test_function = function(func) {
    var f=eval('('+func.code+')');
    $scope.current_function = new f();
  };
  
  self.message = function(message) {
    $scope.message = message;
    setTimeout(function() {      
      $scope.$apply(function() {
        $scope.message = null;
      });
    }, 3000);
  };
  

  Entry.query({query:'{"type":"tb_schema"}'},function(result) {
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
  });
  
  $('iframe#upload_target').load(function() {
    var contents = $('iframe#upload_target').contents();
    var data = $.parseJSON(contents.find("body")[0].innerHTML);
    if(data.success) {
      $scope.$apply(function(){
        $scope.success = true;
        var col_length = 0;
        var obj_list = [];
        var column_names = [];
        var max = 0;
        angular.forEach(data.csv, function(row, idx) {
          var tmp_obj = {};
          angular.forEach(row,function(value, i) {
            var column_name = 'col'+i;
            if(i>max) {
              max=i;
            }
            tmp_obj['col'+i] = value.value;
          });
          obj_list.push(tmp_obj);
          if(row.length > col_length) {
            col_length = row.length;
          }
        });
        for(var i=0;i<max;i++) {
          column_names.push({'name':'col'+i});
        }
        $scope.result = {'data':obj_list,'column_names':column_names};
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
      $scope.success = true;
      $scope.theFile = element.files[0];
    });
  };
  
  $scope.del_element = function () {   
    angular.forEach($scope.result.data, function(doc, idx) { 
      if(doc._ng_selected) {
        doc.hide=true;
      }
    });      
  };
  
  $scope.save = function() {
    var obj_list = [];
    angular.forEach($scope.result.data, function(row,r_idx) {
      if(!row.hide) {
        row['schema'] = $scope.schema._id;
        Entry.save({}, row, function(result) {
         if(result.success) {
          $scope.document_saved+=1;
         }
        });
      }
    });
  }
};

function CsvListController($scope,Csv) {  
  var query_str = JSON.stringify({query:{root:true}});
  $scope.raw_list = Csv.query({query:query_str});
}

function CsvUploadController($scope,Csv) {  
  $scope.saved_doc = 0;
  $scope.failed_doc = 0;
  $('iframe#upload_target').load(function() {
    var contents = $('iframe#upload_target').contents();
    var data = $.parseJSON(contents.find("body")[0].innerHTML);
    if(data.success) {
      $scope.total_docs = data.csv.length;
      var r_obj = {'root':true,'name':$scope.theFile.name};
      Csv.save({},r_obj,function(res) {
        if(res.success) {
          r_obj._id =  res._id;
          $scope.success = true;
          var max_col = 0;
          angular.forEach(data.csv, function(row, idx) {
            var tmp_obj = {'_row':idx};
            angular.forEach(row,function(value, i) {
              tmp_obj['col'+i] = value.value;
              if(i>max_col) {
                max_col=i;
              }
            });
            tmp_obj['raw_id'] = res._id;
            Csv.save({},tmp_obj,function(r_doc) {
              if(r_doc.success) {
                $scope.saved_doc+=1;
              } else {
                $scope.failed_doc+=1;
              }
            });
          });
          r_obj['attrs'] = [];
          for(var i=0;i<=max_col;i++) {
            r_obj['attrs'].push({name:'col'+i,hidden:true});
          }
          Csv.update({id:r_obj._id}, 
           angular.extend({},r_obj,{_id:undefined}));
        }
      });
    } else {
      $scope.success = false;
      $scope.message = data.message;
    }
  });
   
  $scope.setFile = function(element) {
    $scope.$apply(function() {
      $scope.success = true;
      $scope.theFile = element.files[0];
    });
  };
};  

function CsvViewController($scope,$routeParams,Csv,Entry) {  
  $scope.pageSize = 25;

  $scope.csv = Csv.get({id:$routeParams.id},function(res) {
    $scope.fields = [];
    $scope.currentPage = 0;
    var query_json = {raw_id:res._id};
    angular.forEach(res, function(value, key) {
      if(value.name) {
        $scope.fields.push({'key':key,'value':value});
      }
    });
    $scope.message = "Loading...";
    $scope.document_list = Csv.query({query:JSON.stringify(query_json)},
      function(r_res) {
      $scope.message = "";
      $scope.totalPage = Math.ceil(r_res.length/$scope.pageSize)-1;
    });
  });
  
  $scope.function_list = Entry.query({
    query:'{"type":"function_entry"}'
  });

  $scope.test_function = function() {
    var f=eval('('+$scope.selected_function.code+')');
    $scope.current_function = new f();
  };

  var query_str = JSON.stringify({query:{root:true}});
  $scope.raw_list = Csv.query({query:query_str});
  
  $scope.update_doc = function(doc) {
    Csv.update({id:doc._id},
      angular.extend({},doc,{_id:undefined}),
      function(res) {
        console.log(res);
    });
  };

  
  var save_doc_list = function(doc_list) {
    for(var idx=0;idx<doc_list.length;idx++) {
      if(!doc_list[idx]['_saved']) {
        var doc = doc_list[idx];
        Csv.update({id:doc._id},
          angular.extend({},
            doc,{
              _id:undefined,
              _sync_table:undefined}),
          function(res) {
            doc_list[idx]['_saved'] = true;
            save_doc_list(doc_list);
            $scope.document_saved+=1;
        });
        break;
      }
    }
  };
  
  $scope.save_docs = function() {
    var doc_saved = 0;
    $scope.document_saved=0;
    Csv.update({id:$scope.csv._id},
      angular.extend({},$scope.csv,{_id:undefined}),
      function(res) {
        if(res.success) {
          save_doc_list($scope.document_list);
          /*
          angular.forEach($scope.document_list,function(doc) {
            Csv.update({id:doc._id},
              angular.extend({},doc,{_id:undefined},{_sync_table:undefined}),
                function(s_res) {
                  if(s_res.success) {
                    doc_saved++;
                    if(doc_saved==$scope.document_list.length) {
                      $scope.document_saved=doc_saved;
                    } else {
                      if(doc_saved % 50 == 0) {
                        $scope.document_saved=doc_saved;
                        console.log(doc_saved);
                      }
                    }
                  }
            });
          });
          */
        }
    });
  };
};

function CsvController($scope,$location,$routeParams,Csv) {  
  $scope.csv = Csv.get({id:$routeParams.id},function(res) {
    var query_str = JSON.stringify({raw_id:res._id});
    $scope.document_list = Csv.query({query:query_str}, function(res) {
      $scope.document_size = res.length;
    });
  });
 
  $scope.delete_csv = function() {
    if($scope.document_size == 0) {
      Csv.remove({id:$scope.csv._id},function(res) {
        if(res.success) {
          $location.path('/csv');
        }
      });
    }
  };
  
  $scope.clear_document = function() {
    angular.forEach($scope.document_list, function(doc) {
      Csv.remove({id:doc._id},function(res) {
        if(res.success) {
          $scope.document_size -= 1;
        }
      });
    });
  };
   
  $scope.save = function() {
    Csv.update({id:$scope.csv._id}, 
     angular.extend({},$scope.csv,{_id:undefined}),function(res) {
       if(res.success) {
         $scope.message = "Saved";
         setTimeout(function() {      
           $scope.$apply(function() {
             $scope.message = null;
           });
         }, 3000);
       };
    });
  }
}

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
