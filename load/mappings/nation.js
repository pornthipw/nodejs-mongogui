var config = require('../../config');
var php_util = require('../util/php_util');
var php_url = config.phpmyadmin_config.url;

var map_entry = {};

var mapping = {
 map:function(nationcode,cb) {
  var key = 'key_'+nationcode;
// console.log(map_entry);
  if(key in map_entry) {
   cb(map_entry[key]);
  } else {
   php_util.query(php_url,'select * from alldata.co_nation '+
     'where nationcode='+nationcode,function(result) {
    if(result.length==1) {
      var nation_php = result[0];
      map_entry[key] = nation_php.nationdesc;
      cb(map_entry[key]);
    } else {
      cb(undefined);
    }
   });
  }
 }
}

exports.mapping = mapping;
