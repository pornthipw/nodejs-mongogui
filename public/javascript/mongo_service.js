var app = angular.module('mongo_service', ['ngResource']);

app.factory('MongoDB', function($resource) {
  var MongoDB = $resource('/db/person/:id', {    
    id: '@id'
  },
  {update: { method:'PUT' }});
  return MongoDB;
});

app.factory('User', function($resource) {
    var User  = $resource('user',{}, {});   
    return User;   
});

app.factory('Logout', function($resource) {
    var Logout  = $resource('logout',{}, {});   
    return Logout ;   
});




