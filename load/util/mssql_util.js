var http = require('http');

var request = function(msql_url,config, callback) {
  var sql_query = {'sql':config.sql,'params':config.params};
  http.get(msql_url+'?query='+JSON.stringify(sql_query), function(res) {
    var content='';
    res.on('data', function(chunk) {
      content+=chunk;
    });
    res.on('end', function() {
      callback(JSON.parse(content));
    });
  });
}

exports.request = request;
