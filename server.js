var express = require("express");
var fs = require('fs');
var handlebars = require('hbs');
var mongodb = require('mongodb');
var _ = require('underscore');

var routes = require('./routes');
var config = require('./config');
var utils = require('./utils');



handlebars.registerHelper('compare', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    operator = options.hash.operator || "==";

    var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
    }

    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

    var result = operators[operator](lvalue,rvalue);

    if( result ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});



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
var collections = [];
var databases = [];
var mainConn;

var db = new mongodb.Db('local', new mongodb.Server(host, port, dbOptions));

var updateCollections = function(db, dbName, callback){
    db.collectionNames(function(err, result) {
        var names = [];
        
        for (var r in result) {
            var coll = utils.parseCollectionName(result[r].name);
            names.push(coll.name);
            console.log(coll.name);
        }
        collections.push({'db_name':dbName, 'collections': names.sort()});
        
        
        if (callback) {
            callback(err);
        }        
        console.log(collections);
    });
};


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
            
            updateCollections(connections[dbName], dbName);           
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
    collections:collections,
    baseHref:config.site.baseUrl
});


app.get('/', middleware, routes.index);

app.listen(config.site.port || 3000);

console.log("Mongo Express server listening on port " + (config.site.port || 3000));



//var server = app.listen(3000);
