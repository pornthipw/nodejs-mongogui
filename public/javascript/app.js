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
/*
  $routeProvider.when('/csv',{
    controller:CsvListController, 
    templateUrl:'static/csv/index.html'
  });

  $routeProvider.when('/csv/view/:id',{
    controller:CsvViewController, 
    templateUrl:'static/csv/view.html'
  });
*/
  $routeProvider.when('/csv/upload',{
    controller:CsvUploadController, 
    templateUrl:'static/csv/upload.html'
  });
/*
  $routeProvider.when('/csv/:id',{
    controller:CsvController, 
    templateUrl:'static/csv/main.html'
  });
*/
/*
  $routeProvider.when('/plugin',{
    controller:PluginController, 
    templateUrl:'static/plugin.html'
  });
*/
/*
  $routeProvider.when('/function',{
    controller:FunctionController, 
    templateUrl:'static/function.html'
  });
 */ 
 /*
  $routeProvider.when('/manager', {
    controller:SchemaManageController, 
    templateUrl:'static/schema_manager.html'
  });
 */ 
/*
  $routeProvider.when('/schema/:id', {
    controller:SchemaController, 
    templateUrl:'static/schema.html'
  });
  
  $routeProvider.when('/schema/edit/:id', {
    controller:SchemaController, 
    templateUrl:'static/schema.html'
  });
 */ 
 /*
  $routeProvider.when('/document/schema/:schemaId/edit/:id', {
    controller:DocumentController, 
    templateUrl:'static/document.html'
  });
 */ 
  $routeProvider.when('/role', {
    controller:RoleController, 
    templateUrl:'static/role_manager.html'
  });
  
  $routeProvider.when('/test', {
    controller:TestController, 
    templateUrl:'static/test.html'
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

function TestController($scope, PHPMyadmin, SQL){
  console.log("test");

  var sql_str = {'sql':'select * from F21_06850.person limit 0, 1'};
  $scope.data = PHPMyadmin.query(sql_str, function(res){
    console.log(res);
  });
 
  $scope.mapping_schema = CSVMapping.schema;

  $scope.test = function() {
    var f = $scope.type['function'];
    new f({
      'csv':{'info':'','list':$scope.data},
      'sql':SQL
    }, function(success, model) {  
      console.log(success);
      console.log(model);
    });
  };

  $scope.pai_mapping_schemai = PAIMapping.schema;
  PAIMapping.map1(SQL, function(title_list) {
   console.log(title_list); 
  });

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

function MainController($scope, Entry,MapReduce,SQL) {
  var self = this;

  var p_model = new ProvinceModel(); 
  /*
  p_model.json = {'cols':[]};
  p_model.json.cols.push({'value':'77'});
  p_model.json.cols.push({'value':'พรทิพย์'});
  p_model.insert(SQL, function(res) {
    console.log(res);
  });
  var csv = {};
  p_model.json.cols[1].value = csv.col80;
  p_model.insert();
  */

  p_model.get(SQL,"01",function(exists) {
    if(exists) {
      p_model.get_cities(SQL, function(cities) {
        console.log(cities);
      });
      p_model.json.cols[1].value = "กระบี่";
      p_model.update(SQL, function(res) {
        console.log(res);
      });
    }
  });
 
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

function CsvUploadController($scope,Csv, SQL) {  
  $scope.saved_doc = 0;
  $scope.failed_doc = 0;
  $scope.success_list = [];
  $scope.fail_list = [];

  $scope.test = function() {
    var f = $scope.type['function'];
    new f({
      'csv':{'info':'','list':$scope.data.csv},
      'sql':SQL
    }, function(success, model) {  
      console.log(success);
      console.log(model);
      if(success) {
        $scope.success_list.push(model);
      } else {
        $scope.fail_list.push(model);
      }
    }); 
  };      

  $('iframe#upload_target').load(function() {
    var contents = $('iframe#upload_target').contents();
    var data = $.parseJSON(contents.find("body")[0].innerHTML);
    $scope.$apply(function() {
      $scope.data = data;
      $scope.mapping_schema = CSVMapping.schema;
    });
    if(data.success) {
      console.log(data);
     
      /*
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
      */
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

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
