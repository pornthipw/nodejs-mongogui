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
   'name':'person',
   'list': ['CID','FirstName','LastName'],
   'pk':['CID']
  },
  {
   'name':'province',
   'list': ['ProvinceID','ProvinceDescription'],
   'pk':['ProvinceID']
  }
];

function SQL_MainController($scope) {
  console.log('SQL');
};


function SQLController($scope,$routeParams,SQL) {
  angular.forEach(sql_entry, function(table) {
    if(table.name == $routeParams.table) {
      $scope.table = table;
    }
  });

  SQL.query({'query':'select * from '+$routeParams.table},function(res){
    var result = [];
    angular.forEach(res, function(row) {
      var obj = [];
      var pk = [];
      angular.forEach(row.cols, function(col) {
        if($scope.table.list.indexOf(col.metadata.colName)!=-1) { 
         if($scope.table.pk.indexOf(col.metadata.colName)!=-1) {
           pk.push(col);
         }
         obj.push(col);
        }
      });
      result.push({'content':obj,'pk':pk});
    });
    $scope.result = result;
  });
  
  $scope.get = function(pk) {
    var query = "select * from "+$routeParams.table+" WHERE ";
    angular.forEach(pk,function(p,key) {
      query+=p.metadata.colName+' = "'+p.value+'" ';
      if(key<pk.length-1) {
        query+=' AND ';
      }
    });
    console.log(query);
    SQL.query({'query':query},function(res){
      $scope.entry = res[0];
      console.log($scope.entry);
    });
  };
  
};
