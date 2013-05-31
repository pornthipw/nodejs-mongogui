
var config = require('../../config');
var php_util = require('../util/php_util');
var php_url = config.phpmyadmin_config.url;

var map_entry = {};

var mapping = {
 map:function(sex_code,cb) {
  var key = 'key_'+sex_code;
// console.log(map_entry);
  if(key in map_entry) {
   cb(map_entry[key]);
  } else {
   php_util.query(php_url,'select * from alldata.co_sex '+
     'where sex_code='+sex_code,function(result) {
    if(result.length==1) {
      var gender_php = result[0];
      if (gender_php.sex_desc=='ชาย') {
        map_entry[key] = 'M';
      } else {
        if (gender_php.sex_desc=='หญิง') {
         map_entry[key] = 'F';
        }
      }
      //map_entry[key] = gender_php.sex_desc;
      cb(map_entry[key]);
    } else {
      cb(undefined);
    }
   });
  }
 }
}

exports.mapping = mapping;
