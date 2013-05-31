// Load content from PHPMyAdmin
var http = require('http');

var request = function(url,callback) {
 http.get(url, function(res) {
  var content='';
  res.on('data', function(chunk) {
   content+=chunk;
  });
  res.on('end', function() {
   callback(JSON.parse(content));
  });
 });
};

var query = function(php_url,sql,cb) {
 var get_r = php_url+'/?sql_query='+sql;
 request(get_r, function(content) {
   cb(content);
 });
};

var load_all = function(php_url,table_name,cb) {
 var list = [];
 var get_r = php_url+'/?sql_query=select count(*) as rows from '+table_name;
 request(get_r,function(result) {
  var rows = result[0].rows;
  var chunk = 50;
  var prefix_query = php_url+'/?sql_query=select * from '+table_name;
  for(var i=0;i<rows;i=i+chunk) {
   request(prefix_query+' limit '+i+','+chunk, function(content) {
    content.forEach(function(title) {
     list.push(title);
     if(list.length==rows) {
      cb(list);
     }
    });
   });
  }
 });
};

exports.request = request;
exports.load_all = load_all;
exports.query = query;
