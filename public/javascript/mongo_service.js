angular.module('mongo_service', ['ngResource']).
factory('MongoDB', function($resource) {
  var MongoDB = $resource('http://www.db.grad.nu.ac.th/apps/mongodb/databases/test/collections/person/:document', {    
    document: '@document'
  },
  {update: { method:'PUT' }});
  return MongoDB;
});

angular.module('mongo_stats_service', ['ngResource']).
factory('MongoStats', function($resource) {
  var MongoStats = $resource('http://www.db.grad.nu.ac.th/apps/mongodb/stats/test/person', {
    collection: '@collection'
  },
  {info: { method:'GET' }});
  return MongoStats;
});

angular.module('gridstore_service', ['ngResource']).
factory('GridStore', function($resource) {
  var GridStore = $resource('gridstore/:database', {
    database: '@database'
  },
  {});
  return GridStore;
});
