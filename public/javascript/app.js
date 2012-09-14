angular.module('mongogui', ['mongo_service','mongogui.csv_controller']).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:MongoController, templateUrl:'/static/db_list.html'}).
            when('/csv', {controller:UploadController, templateUrl:'/static/csv/csv_list.html'});            
    });


