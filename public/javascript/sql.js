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
];

function SQL_MainController($scope) {
  console.log('SQL');
};


function SQLController($scope,$routeParams,SQL,Csv) {
  $scope.synced_count=0;

  var select_all = function() {
    var query_str = {
      sql:'select * from '+$routeParams.table
    };
    SQL.query({'query':JSON.stringify(query_str)},function(res){
      $scope.sample = res[0];
      var result = [];
      angular.forEach(res, function(row) {
        var obj = [];
        var pk = [];
        angular.forEach(row.cols, function(col) {
          if($scope.table.list.indexOf(col.metadata.colName)!=-1) { 
            $scope.table.pk.forEach(function(key) {
              if(key.name.indexOf(col.metadata.colName)!=-1) {
                pk.push(col);
              }
            });
            obj.push(col);
          }
        });
        result.push({'content':obj,'pk':pk});
      });
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
      if(res.length==0) {
        callback(false,null);
      } else {
        callback(true,res[0]);
      }
    });
  };
  
  $scope.check = function(csv) {
    entry_exists(csv, function(exists,res) {
      if(exists) {
        var synched=true;
        angular.forEach(res.cols, function(col) {
          if(csv[$routeParams.table+'_'+col.metadata.colName]) {
            if(csv[$routeParams.table+'_'+col.metadata.colName] != col.value) {
              var synched=false;
            }
          }
        });
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
              }
            });
          }
        }
      }
    });
  };
  
  $scope.sync_all = function() {
    angular.forEach($scope.csv_list, function(csv) {
      $scope.sync(csv);
    });
  };
  
  $scope.sync = function(csv) {
    if(csv['_sync_table']) {
      $scope.check(csv);
      if(!csv['_sync_table'][$routeParams.table]) {
        entry_exists(csv, function(exists) {
          if(!exists) {
            $scope.insert(csv,function(c) {
              $scope.update(csv);
            });
          } else {
            $scope.update(csv);
          }
        });
      }
    } else {
      entry_exists(csv, function(exists) {
        if(!exists) {
          $scope.insert(csv,function(c) {
            $scope.update(csv);
          });
        } else {
          console.log('Update CSV');
          $scope.update(csv);
        }
      });
    }
  };

  $scope.update = function(csv) {
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
    
    console.log(query);

    SQL.query({'query':JSON.stringify({
      'sql':query,'params':params})},function(res){
       $scope.check(csv);
    });
  };

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
    SQL.query({'query':JSON.stringify({
      'sql':query,'params':params})},function(res){
      if(res.length==0) {
        select_all();
        callback(csv);
      }
    });
  };
  
  $scope.get = function(pk) {
    var query = "select * from "+$routeParams.table+" WHERE ";
    angular.forEach(pk,function(p,key) {
      query+=p.metadata.colName+' = "'+p.value+'" ';
      if(key<pk.length-1) {
        query+=' AND ';
      }
    });
    SQL.query({'query':query},function(res){
      $scope.entry = res[0];
      console.log($scope.entry);
    });
  };
  
};
