var tedious = require('tedious');
var generic_pool = require('generic-pool');

var AzureConnect = function(config) {
  
  var type_map = {
    'VarChar':tedious.TYPES.NVarChar,
    'Int':tedious.TYPES.Int,
    'BigInt':tedious.TYPES.BigInt,
  };

  var pool = generic_pool.Pool({
    name:'mssqldb',
    max:1,
    create: function(callback) {
      console.log(config);
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
  
  /*
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
          res.json(rows);
        });
        request.on('row', function(cols) {
          rows.push({'cols':cols});
        });

        con.execSql(request);
      }
    });
  };
  */
  
  this.query_post = function(req,res) {
    pool.acquire(function(err,con) {
      if(err) {
        pool.release(con);
        res.json({'success':false,'error':err});
      } else {
        try {
          var qobj = JSON.parse(req.body.query);
          console.log(qobj.sql);
          console.log(qobj);
          var rows = [];
          var request = new tedious.Request(qobj.sql, function(err,rc) {
            if(err) {
              pool.release(con);
              console.log(err);
              res.json({'success':false,'error':err});
            } else {
              console.log(rc+' rows');
              pool.release(con);
              res.json({'success':true,'rows':rows});
            }
          //console.log(rows.length+' returned');
          });

          if(qobj.params) {
            qobj.params.forEach(function(param) {
              console.log(param);
              request.addParameter(param.name,type_map[param.type],param.value);
            });
          }

          request.on('row', function(cols) {
            rows.push({'cols':cols});
          });

          con.execSql(request);
        } catch(err) {
          console.log(err);
          pool.release(con);
          res.json({'success':false,'error':err});
        }
      }
    });
  };


  this.query = function(req,res) {
    pool.acquire(function(err,con) {
      if(err) {
        pool.release(con);
        res.json({'success':false,'error':err});
      } else {
        try {
    
          var qobj = JSON.parse(req.query.query);
          console.log(qobj.sql);
          console.log(qobj);
          var rows = [];
          var request = new tedious.Request(qobj.sql, function(err,rc) {
            if(err) {
              pool.release(con);
              console.log(err);
              res.json({'success':false,'error':err});
            } else {
              console.log(rc+' rows');
              pool.release(con);
              res.json({'success':true,'rows':rows});
            }
          //console.log(rows.length+' returned');
          });

          if(qobj.params) {
            qobj.params.forEach(function(param) {
              console.log(param);
              request.addParameter(param.name,type_map[param.type],param.value);
            });
          }

          request.on('row', function(cols) {
            rows.push({'cols':cols});
          });

          con.execSql(request);
        } catch(err) {
          console.log(err);
          pool.release(con);
          res.json({'success':false,'error':err});
        }
      }
    });
  };
};

exports.azure_connect = AzureConnect;

