
var config = require('../../config');
var php_util = require('../util/php_util');
var mssql_util = require('../util/mssql_util');

var php_url = config.phpmyadmin_config.url;
var mssql_url = 'http://www.db.grad.nu.ac.th/apps/demo/query';

var map_entry = {};

var insert = function(provname,id,cb) {
/*
 var id_str = ''+id;
 if(id<10) {
  id_str='00'+id;
 } else {
  if(id<100) {
   id_str='0'+id;
  } 
 }
*/
 var sql = 'insert into Province (ProvinceID, ProvinceDescription)' 
  +' values (@id,@description)';

 var params = [
  {'name':'description', 'type':'VarChar','value':provname},
  {'name':'id', 'type':'VarChar','value':id}
 ];

 mssql_util.request(mssql_url,{
  'sql':sql,'params':params}, function(insert_res) {
  if(insert_res.success) {
   console.log('Insert new ID:'+id+' - '+provname);
   cb(id);
  } else {
   insert(provname,id+1,cb);
  }
 });

};

var mapping = {
 map:function(provid,cb) {
  var key = 'key_'+provid;
 console.log(map_entry);
  if(key in map_entry) {
   cb(map_entry[key]);
  } else {
   php_util.query(php_url,'select * from alldata.co_province '+
     'where provid='+provid,function(result) {
    if(result.length==1) {
      var province_php = result[0];
      var params = [
       {'name':'description', 'type':'VarChar','value':province_php.provname}
      ];
      mssql_util.request(mssql_url,{'sql':'select * from Province '+
       'where ProvinceDescription=@description',
       'params':params},function(res) { 
       if(res.rows.length==0) {
        insert(province_php.provname,1,function(r_id) {
         map_entry[key] = r_id;
         cb(map_entry[key]);
        });
       } else {
        if(res.rows.length==1) {
         console.log(res.rows[0].cols[1].value);
         map_entry[key] = res.rows[0].cols[0].value;
         cb(map_entry[key]);
        } else {
         cb(undefined);
        }
       }
      });
    } else {
      cb(undefined);
    }
   });
  }
 }
}

