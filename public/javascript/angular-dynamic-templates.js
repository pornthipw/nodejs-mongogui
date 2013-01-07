var app = angular.module('dynamicTemplate', []);
app.directive('dynamicTemplate', function($compile) {

  var linker = function(scope, element, attrs) {
    scope.$watch('localTemplate',
    function(value) {
      element.html(scope.localTemplate);
      $compile(element.contents())(scope);
    });
  }
  
  return {
    restrict:'A',
    replace:true,
    transclude:true,
    link: linker,
    scope: {
      localTemplate:'=template',
      content:'=content' 
    }
  }
});
