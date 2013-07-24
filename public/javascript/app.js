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
  $routeProvider.when('/', {
    controller:CsvUploadController, 
    templateUrl:'static/csv/upload.html'
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
      //console.log(response);
      if(response.success) {
        $scope.get_user(orig._id);
      }
    });
  };
  
}


function CsvUploadController($scope,Csv, SQL) {  
  $scope.saved_doc = 0;
  $scope.failed_doc = 0;
  $scope.success_list = [];
  $scope.fail_list = [];

  $scope.test = function() {
    var f = $scope.type['function'];
    for(var i=0;i<$scope.data.csv.length;i++) {
      $scope.data.csv[i].message_list = [];
    }
    new f({
      'csv':{'info':'','list':$scope.data.csv},
      'sql':SQL
    }, function(success, model) {  
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
      //console.log(data);
    } else {
      $scope.success = false;
      $scope.message = data.message;
    }
  });
   
  $scope.setFile = function(element) {
    $scope.$apply(function() {
      $scope.success = true;
      $scope.theFile = element.files[0];
      $scope.data = [];
    });
  };
};  

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
