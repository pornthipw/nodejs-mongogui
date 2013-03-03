var az = require('./mssql_db');
var config = require('./config');

var mssql = new az.azure_connect(config.azure_connect);

mssql.query("select * from person", function(err,res) {
  console.log('done 1');
  console.log(res);
});

