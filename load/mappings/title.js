var config = require('../../config');
var php_util = require('../util/php_util');
var mssql_util = require('../util/mssql_util');

var php_url = config.phpmyadmin_config.url;
var mssql_url = 'http://www.db.grad.nu.ac.th/apps/demo/query';

var map_entry = {};

var insert = function(titlename,id,cb) {
 mssql_util.request(mssql_url,{
  'sql':'select * from Title'}, function(res) {
  if(res.rows.length>id) { 
    id=res.rows.length;
  }
  console.log('Current ID:'+id);
  var id_str = ''+id;
  if(id<10) {
   id_str='00'+id;
  } else {
   if(id<100) {
    id_str='0'+id;
   } 
  }
  var sql = 'insert into Title (TitleID, Description)' 
   +' values (@id,@description)';

  var params = [
   {'name':'description', 'type':'VarChar','value':titlename},
   {'name':'id', 'type':'VarChar','value':id_str}
  ];

  mssql_util.request(mssql_url,{
   'sql':sql,'params':params}, function(insert_res) {
   if(insert_res.success) {
    console.log('Insert new ID:'+id_str+' - '+titlename);
    cb(id_str);
   } else {
    insert(titlename,id+1,cb);
   }
  });
 });
};

var mapping = {
 map:function(titlecode,cb) {
  var key = 'key_'+titlecode;
 // console.log(map_entry);
  if(key in map_entry) {
   cb(map_entry[key]);
  } else {
   php_util.query(php_url,'select * from alldata.co_title '+
     'where titlecode='+titlecode,function(result) {
    if(result.length==1) {
      var title_php = result[0];
      var params = [
       {'name':'description', 'type':'VarChar','value':title_php.titlename}
      ];
      // console.log(title_php.titlename);
      mssql_util.request(mssql_url,{'sql':'select * from Title '+
       'where Description=@description',
       'params':params},function(res) { 
       if(res.rows) {
        if(res.rows.length==0) {
         insert(title_php.titlename,0,function(r_id) {
          map_entry[key] = r_id;
          cb(map_entry[key]);
         });
        } else {
         if(res.rows.length==1) {
          console.log('Exists :'+res.rows[0].cols[1].value);
          map_entry[key] = res.rows[0].cols[0].value;
          cb(map_entry[key]);
         } else {
          cb(undefined);
         }
        }
       } else {
        cb(undefined);
       }
      });
    } else {
      console.log('Error in titlename :'+title_php.titlename);
      cb(undefined);
    }
   });
  }
 }
}

exports.mapping = mapping;
