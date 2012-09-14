angular.module('mongogui.csv_controller', []).
    directive('fileupload', function() {
      return {
        restrict: 'E',
        replace: true,
        template: 
          '<form method="post" enctype="multipart/form-data" ng-submit="submit()">' +
          '<input type="file" name="file" ng-model="file"/>' +
          '<div><img src="{{ img }}"/></div>' +
          '<input type="submit"/></form>',
        controller: function( $scope ) {
            $scope.img = "http://png-2.findicons.com/files/icons/1715/gion/128/go_up.png";
            
            $scope.submit = function() {
                
                $.post('/csv/giveAnUploadUrl', function() {
                    console.log("nookkkkkkkkkkkkkkk");
                    $scope.$apply(function(){
                        $scope.img = "http://png-4.findicons.com/files/icons/985/affel/128/tick.png";
                        
                        
                    });
                }).error(function(){
                    $scope.$apply(function(){
                        $scope.img = "http://png-2.findicons.com/files/icons/744/juicy_fruit/128/warning.png";
                    });
                });
            };
            },
        link: function( scope, elem, attrs ) {
            /*I run after template is put in */ 
        }
      };  
    });

function UploadController($scope,MongoDB) {    

}




