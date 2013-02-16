var app = angular.module('mongo_service', ['ngResource']);

var prefix = '/apps/demo';

app.factory('Entry', function($resource) {
  var MongoDB = $resource(prefix + '/db/entry/:id', {    
    id: '@id'
  },
  {update: { method:'PUT' }});
  return MongoDB;
});

app.factory('MapReduce', function($resource) {
  var MapReduce = $resource(prefix + '/mapreduce/entry', {    
  },
  {query: { method:'POST',isArray:false }});
  return MapReduce;
});

app.factory('Csv', function($resource) {
  var Csv = $resource(prefix + '/db/csv/:id', {
    id: '@id'
  },
  {update: { method:'PUT' }});
  return Csv;
});

app.factory('Admin', function($resource) {
  var Admin = $resource(prefix + '/admin/users/:id', {
  },
  {update: { method:'PUT' }});
  return Admin;
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





