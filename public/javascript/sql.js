app.config(function($routeProvider) {
  $routeProvider.when('/sql', {
    controller:SQL_MainController,
    templateUrl:'static/sql.html'
  });

  $routeProvider.when('/sql/:table', {
    controller:SQLController,
    templateUrl:'static/sql.html'
  });

  $routeProvider.when('/sql/:table', {
    controller:SQLController,
    templateUrl:'static/sql.html'
  });
});

var sql_entry = [
  {
   'name':'Person',
   'list': ['CID','FirstName','LastName'],
   'pk':[{name:'CID',type:'VarChar'}]
  },
  {
   'name':'Province',
   'list': ['ProvinceID','ProvinceDescription'],
   'pk':['ProvinceID']
  },
  {
   'name':'City',
   'list': ['CityID','CityDescription','ProvinceID'],
   'pk':['CityID']
  },
  {
   'name':'Title',
   'list': ['TitleID','TitleDescription'],
   'pk':['TitleID']
  },
];

function SQL_MainController($scope) {
  console.log('SQL');
};


function SQLController($scope,$routeParams,SQL,Csv) {
  $scope.synced_count=0;
  $scope.sqlLimit = 10;
  
  $scope.select_entry = function(sql) {
    $scope.sql_entry = sql;
    console.log(sql);
  };

  var select_all = function() {
    $scope.select_all_message = "Loading ....";
    var query_str = {
      sql:'select * from '+$routeParams.table
    };
    SQL.query({'query':JSON.stringify(query_str)},function(res){
      $scope.sample = res[0];
      $scope.sqlTotalPage = Math.ceil(res.length/$scope.sqlLimit);
      var result = [];
      angular.forEach(res, function(row) {
        var obj = [];
        var pk = [];
        angular.forEach(row.cols, function(col) {
          if($scope.table.list.indexOf(col.metadata.colName)!=-1) { 
            obj.push(col);
          }
        });
        result.push({'content':obj,'obj':row});
      });
      $scope.select_all_message = "";
      $scope.result = result;
    });
  };
  

  angular.forEach(sql_entry, function(table) {
    if(table.name == $routeParams.table) {
      $scope.table = table;
      var and_list = [];
      angular.forEach($scope.table.pk, function(pk_key) {
        var obj = {};
        obj[table.name+'_'+pk_key.name]={$exists:true}; 
        and_list.push(obj); 
      });

      and_list.push({$or:[{'_exclude':{$exists:false}},{'_exclude':false}]});
      var table_key = '_sync_table.'+$routeParams.table;
      var sync_query = '{"$or":[{"'+table_key+'":{"$exists":false}},'+
        '{"'+table_key+'":false}]}';
      and_list.push(JSON.parse(sync_query));
      var qstr = {$and:and_list};
      Csv.query({query:JSON.stringify(qstr)},function(res) {
        $scope.csvTotalPage = Math.ceil(res.length/$scope.sqlLimit);
        $scope.csv_list = res;
      });
      select_all();
     }
  });
  
  var entry_exists = function(csv,callback) {
    var params = [];
    var sql_str = "select * from "+$routeParams.table+" WHERE ";
    angular.forEach($scope.table.pk,function(key,idx) {
      sql_str+=key.name+' = @'+key.name;
      params.push({
        'name':key.name,
        'type':key.type,
        'value':csv[$scope.table.name+'_'+key.name]
      });
      if(idx<$scope.table.pk.length-1) {
        sql_str+=' AND ';
      }
    });
    SQL.query({'query':JSON.stringify({
      'sql':sql_str,'params':params})},function(res){
      console.log(res);
      if(res.length==0) {
        callback(false,null);
      } else {
        callback(true,res[0]);
      }
    });
  };
  
  var check = function(csv,callback) {
    entry_exists(csv, function(exists,res) {
      if(exists) {
        var synched=true;
        angular.forEach(res.cols, function(col) {
          if(csv[$routeParams.table+'_'+col.metadata.colName]) {
            if(csv[$routeParams.table+'_'+col.metadata.colName] != col.value) {
              csv['_sync_error'] = col.metadata.colName + ' ('+
               csv[$routeParams.table+'_'+col.metadata.colName]+':'+
               col.value;
              synched=false;
            }
          }
        });
        console.log(synched);
        if(synched) {
          if(!csv['_sync_table']) {
            csv['_sync_table'] = {};
          }
          if(!csv['_sync_table'][$routeParams.table]) {
            csv['_sync_table'][$routeParams.table]=true;
            Csv.update({id:csv._id},
              angular.extend({},csv,{_id:undefined}),
              function(c_res) {
              if(c_res.success) {
                $scope.synced_count+=1;
                if(callback) callback(synched,csv);
              }
            });
          }
        } else {
          if(callback) callback(synched,csv);
        }
      } else {
        if(callback) callback(false,null);
      }
    });
  };
  
  $scope.sync_all = function() {
    for(var idx=0;idx<$scope.csv_list.length;idx++) {
      var c_csv = $scope.csv_list[idx];
      if(!c_csv['_sync_skip'] && (!c_csv['_sync_table'] ||  
        !c_csv['_sync_table'][$routeParams.table])) {
        console.log('Check idx = '+idx);
        $scope.sync(c_csv,function(success) {
          if(success) {
            console.log('Synched .. '+c_csv._id);
          } else {
            console.log('Skiped .. '+c_csv._id);
            c_csv['_sync_skip'] = true;
          }
          $scope.sync_all();
        });
        break;
      }
    }
  };
  
  $scope.sync = function(csv,cb) {
    check(csv,function(synched, r_csv) {
      console.log('Synched '+synched);
      if(!synched) {
        if(!r_csv) {
         // insert
         $scope.insert(csv,function(c) {
           if(c) {
             $scope.update(csv,function(u) {
               check(csv,function(rc) {
                 if(cb) cb(rc);
               });
             });
           } else {
             if(cb) cb(false);
           }
         });
        } else {
         $scope.update(csv,function(u) {
           check(csv,function(rc) {
             if(cb) cb(rc);
           });
         });
        }
      } else {
        if(cb) cb(true);
      }
    });
  };
  
  $scope.all_select = function() {
    select_all();
  }

  $scope.update = function(csv,callback) {
    var query = "UPDATE "+$routeParams.table+" SET ";
    var params = [];
    var set_key = [];
    var p_key = [];

    $scope.sample.cols.forEach(function(col) {
      if(csv[$scope.table.name+'_'+col.metadata.colName]) { 
        var primary = false;
        $scope.table.pk.forEach(function(key) {
          if(key.name==col.metadata.colName) {
            primary=true;
          }
        });
        if(!primary) {
          set_key.push(col.metadata.colName+'=@'+col.metadata.colName);
        } else {  
          p_key.push(col.metadata.colName+'=@'+col.metadata.colName);
        }
        params.push({
         'name':col.metadata.colName,
         'type':col.metadata.type.name,
         'value':csv[$scope.table.name+'_'+col.metadata.colName]
        });
      }
    });

    if(set_key.length==0) {
      callback(csv);
    } else {
      angular.forEach(set_key, function(str, idx) {
        query+=' '+str;
        if(idx!=set_key.length-1) {
          query+=',';
        }
      });
      query+=' WHERE ';

      angular.forEach(p_key, function(str, idx) {
        query+=' '+str;
        if(idx!=p_key.length-1) {
          query+=',';
        }
      });
      query+=';';
    
      SQL.get({'query':JSON.stringify({
        'sql':query,'params':params})},function(res){
        console.log('Update Response ');
        console.log(res);
        if(res.success) {
          callback(csv);
        }
      });
    }
  };
  
  $scope.delete_sql = function(sql) {
    var query = "DELETE FROM "+$routeParams.table+" WHERE ";
    var params = [];
    angular.forEach($scope.table.pk,function(key,idx) {
      query+= key.name+'=@'+key.name;
      if(idx<$scope.table.pk.length-1) {
        query+=', ';
      }
      angular.forEach(sql, function(col) {
        if(col.metadata.colName == key.name) {
          params.push({
            'name':key.name,
            'type':key.type,
            'value':col.value
          });
        }
      });
    });
    query+=";";
    SQL.get({'query':JSON.stringify({
      'sql':query,'params':params})},function(res){
      console.log(res);
    });
  }

  $scope.insert = function(csv,callback) {
    var query = "INSERT INTO "+$routeParams.table+" (";
    var params = [];
    angular.forEach($scope.table.pk,function(key,idx) {
      query+=key.name;
      if(idx<$scope.table.pk.length-1) {
        query+=',';
      }
    });
    query+=") values (";

    angular.forEach($scope.table.pk,function(key,idx) {
      query+='@'+key.name;
      params.push({
        'name':key.name,
        'type':key.type,
        'value':csv[$scope.table.name+'_'+key.name]
      });
      if(idx<$scope.table.pk.length-1) {
        query+=',';
      }
    });
    query+=")";
    SQL.get({'query':JSON.stringify({
      'sql':query,'params':params})},function(res){
      console.log(res);
      if(res) {
        console.log(res);
        if(!res.success) {
          callback(null);
        }
      } 
      if(res.length==0) {
        console.log('2');
        callback(csv);
      }
    });
  };
};
