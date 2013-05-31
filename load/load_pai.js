// Load content from PHPMyAdmin 
var config = require('../config');
var http = require('http');

var php_util = require('./util/php_util');
var mssql_util = require('./util/mssql_util');

var php_url = config.phpmyadmin_config.url;
var mssql_url = 'http://www.db.grad.nu.ac.th/apps/demo/query';
var title_map = require('./mappings/title').mapping;
var religion_map = require('./mappings/religion').mapping;
var gender_map = require('./mappings/gender').mapping;
var bloodtype_map = require('./mappings/bloodtype').mapping;
var nation_map = require('./mappings/nation').mapping;


function syn_person(person_list,idx,cb) {
 var person = person_list[idx];
 console.log('['+idx+'] '+person.CID);
 mssql_util.request(mssql_url, {
   sql:'select CID from Person where CID='+person.CID
 } , function(result) {

  var sql = '';
  if(result.rows.length>0) {
    // exists
   sql = 'UPDATE Person SET ' 
     +' FirstName = @firstname,'
     +' LastName = @lastname,'
     +' Religion = @religion,'
     +' Title = @title,'
     +' Gender = @gender,'
     +' LiveHouseNumber = @livehousenumber,'
     +' BloodType = @bloodtype,'
     +' Nation = @nation'
   //  +' Religion = @religion'
     +' WHERE '
     +' CID = @cid';
   console.log('Updating '+ person.CID);
  } else {
   // insert
   sql = 'insert into Person (CID, FirstName,'
     +' LastName, Title, Religion, Gender,'
     +' LiveHouseNumber, BloodType, Nation)'
     +' values'
     +' (@cid,@firstname,@lastname,@title,@religion,'
     +' @gender,@livehousenumber, @bloodtype, @nation)';
   console.log('Inserting '+ person.CID);
  }

  title_map.map(person.PRENAME, function(title_value) {
   religion_map.map(person.RELIGION, function(religion_value) {
    gender_map.map(person.SEX, function(gender_value) {
     bloodtype_map.map(person.BGROUP, function(bloodtype_value) {
      nation_map.map(person.NATION, function(nation_value) {

////// 
   var params = [   
     {'name':'cid', 'type':'BigInt', 'value':person.CID},
     {'name':'firstname', 'type':'VarChar', 'value':person.NAME},
     {'name':'lastname', 'type':'VarChar', 'value':person.LNAME},
     {'name':'title', 'type':'VarChar', 'value':title_value},
     {'name':'religion', 'type':'VarChar', 'value':religion_value},
     {'name':'gender', 'type':'VarChar', 'value':gender_value},
     {'name':'livehousenumber', 'type':'VarChar', 'value':person.LiveHouseNumber},
     {'name':'bloodtype', 'type':'VarChar', 'value':bloodtype_value},
     {'name':'nation', 'type':'VarChar', 'value':nation_value},
   ];
   mssql_util.request(mssql_url,{
    'sql':sql,'params':params
   }, function(res) {
     mssql_util.request(mssql_url,{
      'sql': 'select * from Person where CID=@cid',
      'params':params
     }, function(current) {
      if(idx+1 != person_list.length) {
        syn_person(person_list,idx+1,cb);
      } else {
        cb();
      }
     });
   });
///////

      });
     });
    });
   });
  });
 });
};

function synch() {
 //php_util.load_all(php_url,'F21_06850.person', function(person_list) {
 php_util.query(php_url,'select * from F21_06850.person' 
  +' limit 0,2', function(person_list) {
   syn_person(person_list,0,function() {
     console.log('End');
   });
 });
}

synch();

/*
php_util.load_all(php_url,'alldata.co_title', function(title_php) {
 mssql_util.request(mssql_url,{
  'sql':'select * from Title'
 } ,function(title_mssql) {
  synch({ 
   'title_php':title_list,
   'title_mssql':title_mssql
  });
});
*/

/*
map_entry(title_map_config, function(title_map) {
  synch({
   'title_map': title_map
  });
});
*/
