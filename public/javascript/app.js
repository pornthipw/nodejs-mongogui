var app = angular.module('mongogui', ['mongo_service','gridstore_service']);

app.config(function($routeProvider) {
  $routeProvider.
    when('/test', {controller:TestController, templateUrl:'/static/test.html'}).
    when('/csv', {controller:UploadController, templateUrl:'/static/csv/csv_list.html'}).
    when('/', {controller:MongoController, templateUrl:'/static/db_list.html'});
});

app.directive('csvtable', function() {
  return {
    restrict:"E",    
    scope: {
      ngModel:'=ngModel'
    },
    link:function ($scope, element, attrs) {                                    
      $scope.$watch('ngModel', function(table) {
        var str = '';
        for(var row in table) {
          for(var key in table[row]) {
            str+=key+'-';
          }        
        }
        element.replaceWith(str);
      });
      
    }
  };
});


function TestController($scope) {    
  $scope.content = [
    {col1:'c1',col2:'c2',col3:'c3'}
  ];
};

function UploadController($scope,GridStore) {
  $scope.file_list = GridStore.query({database:'mydb'});
  console.log($scope.file_list);

  $('iframe#upload_target').load(function() {
    var data = $.parseJSON($('iframe#upload_target').contents().find("body")[0].innerHTML);
    if(data.success) {
      $scope.$apply(function(){
        $scope.success = true;
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
};
