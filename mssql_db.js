var tedious = require('tedious');
var generic_pool = require('generic-pool');


var AzureConnect = function(config) {
  var pool = generic_pool.Pool({
    name:'mssqldb',
    max:1,
    create: function(callback) {
      //console.log(config);
      con = new tedious.Connection(config);
      con.on('connect', function(err) {
        console.log('Connected');
        callback(err,con);
      });
    },
    destroy: function(con) {
      con.close();
    }
  });
  
  this.query = function(req,res) {
    pool.acquire(function(err,con) {
      if(err) {
        pool.release(con);
        res.json({'success':false,'error':err});
      } else {
        console.log('Making Query');
        var qstr = 'SELECT * FROM '+req.params.table;
        var rows = [];
        var request = new tedious.Request(qstr, function(err,rc) {
          if(err) {
            console.log(err);
            res.json({'success':false,'error':err});
          } else {
            console.log(rc+' rows');
          }
          //console.log(rows.length+' returned');
          pool.release(con);
          res.json({'success':true,'rows':rows});
          
        });
        request.on('row', function(cols) {
          rows.push(cols);
        });

        con.execSql(request);
      }
    });
  };
  
};

exports.azure_connect = AzureConnect;

