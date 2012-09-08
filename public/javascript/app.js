angular.module('mongogui', ['mongo_service']).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:MongoController, templateUrl:'/static/db_list.html'});
});


function MongoController($scope, MongoDB) {
    $scope.db_list = MongoDB.query();         
}
