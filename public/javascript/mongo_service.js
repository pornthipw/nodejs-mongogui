var app = angular.module('mongo_service', ['ngResource']);

var prefix = '/apps/demo';
var prefix1 = '/apps/npai';

app.factory('Entry', function($resource) {
  var MongoDB = $resource(prefix + '/db/entry/:id', {    
    id: '@id'
  },
  {update: { method:'PUT' }});
  return MongoDB;
});

app.factory('PHPMyadmin', function($resource) {
  var PHPMyadmin = $resource(prefix1 + '/?sql_query=:sql', {},
  {
    query: { method:'GET', isArray:true }
  });
  return PHPMyadmin;
});

app.factory('SQL', function($resource) {
  var SQL = $resource(prefix + '/query/:table', {    
    table: '@table'
  },
  {
    query: { method:'GET', isArray:false },
    update: { method:'PUT' }
  });
  return SQL;
});

app.factory('MapReduce', function($resource) {
  var MapReduce = $resource(prefix + '/mapreduce/csv', {    
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





