var app = angular.module('mongo_service', ['ngResource']);

//var prefix = '/apps/demo';
var prefix = '';

app.factory('MongoDB', function($resource) {
  var MongoDB = $resource(prefix + '/db/person/:id', {    
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

app.factory('Role', function($resource) {
  var Role = $resource(prefix + '/db/nook_ac_1/:id', {    
    id: '@id'
  },
  {update: { method:'PUT' }});
  return Role;
});





