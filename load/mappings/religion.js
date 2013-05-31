var config = require('../../config');
var php_util = require('../util/php_util');
var php_url = config.phpmyadmin_config.url;

var map_entry = {};

var mapping = {
 map:function(reli_code,cb) {
  var key = 'key_'+reli_code;
// console.log(map_entry);
  if(key in map_entry) {
   cb(map_entry[key]);
  } else {
   php_util.query(php_url,'select * from alldata.co_religion '+
     'where reli_code='+reli_code,function(result) {
    if(result.length==1) {
      var religion_php = result[0];
      map_entry[key] = religion_php.reli_desc;
      cb(map_entry[key]);
    } else {
      cb(undefined);
    }
   });
  }
 }
}

exports.mapping = mapping;
