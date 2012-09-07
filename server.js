var express = require("express");
var fs = require('fs');
var handlebars = require('hbs');
var mongodb = require('mongodb');

var routes = require('./routes');
var config = require('./config');

var app = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));    
  app.set('views', __dirname + '/views');
  app.engine('html', handlebars.__express);  
  app.set('view engine', 'html');      
});

//Set up database stuff
var host = config.mongodb.server || 'localhost';
var port = config.mongodb.port || mongodb.Connection.DEFAULT_PORT;
var dbOptions = {
  auto_reconnect: config.mongodb.autoReconnect,
  poolSize: config.mongodb.poolSize
};

var connections = {};
var databases = [];
var mainConn;

var db = new mongodb.Db('local', new mongodb.Server(host, port, dbOptions));


var updateDatabases = function(admin) {
    admin.listDatabases(function(err, dbs) {
        if(err) {
            console.error(err);
        }
        for(var key in dbs.databases) {
            var dbName = dbs.databases[key]['name'];
            if(dbName == 'local') {
                continue;
            }
            if(config.mongodb.whitelist.length != 0) {
                if(!_.include(config.mongodb.whitelist,dbName)) {
                    continue;
                }
            }
            if(config.mongodb.blacklist.length != 0) {
                if(_.include(config.mongodb.blacklist,dbName)) {
                    continue;
                }
            }
            connections[dbName] = mainConn.db(dbName);
            databases.push(dbName);            
        }
        databases = databases.sort();
    });
};

db.open(function(err, db) {
    if (err) {
        throw err;
    }
    console.log('Database connected');
    mainConn = db;
    if (config.mongodb.admin === true) {    
        db.admin(function(err, a) {
            adminDb = a;
            if (config.mongodb.adminUsername.length == 0) {
                console.log('Admin Database connected');
                updateDatabases(adminDb);
            } else {
                //auth details were supplied, authenticate admin account with them
                adminDb.authenticate(config.mongodb.adminUsername, config.mongodb.adminPassword, function(err, result) {
                    if (err) {
                        //TODO: handle error
                        console.error(err);
                    }
                    console.log('Admin Database connected');
                    updateDatabases(adminDb);
                });
            }
        });
    }
});

var middleware = function(req, res, next) {
    req.databases = databases;
    next();
};

app.locals({
    databases:databases,
    baseHref:config.site.baseUrl
});


app.get('/', middleware, routes.index);

app.listen(config.site.port || 3000);

console.log("Mongo Express server listening on port " + (config.site.port || 3000));



//var server = app.listen(3000);
