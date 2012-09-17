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
  app.use(express.methodOverride());
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
            // console.log(coll.name);
        }
        
        var found = false;
        for(var idx in collections) {
            if(collections[idx].db_name == dbName) {
                collections[idx].collections = names.sort();
                found = true;
                break;
            }
        }
        
        if(!found) {
            collections.push({'db_name':dbName, 'collections': names.sort()});        
        }
        
        if (callback) {
            callback(err);
        }        
        // console.log(collections);
    });
};


var updateDatabases = function(admin) {
    databases = [];
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

app.param('database', function(req, res, next, id){
    if (!_.include(databases, id)) {
        req.session.error = "Database not found!";
        return res.redirect('/');
    }
    
    req.dbName = id;
    res.locals.dbName = id;
    console.log('Found Database Params :'+id);
    //dbName:databases,
    
    if (connections[id] != undefined) {
        req.db = connections[id];
    } else {
        connections[id] = mainConn.db(id);
        req.db = connections[id];
    }
    
    next();
});

app.param('collection', function(req,res,next,id) {
    
    console.log(' Collection Param :: collection" ' +id +' " from '+req.dbName);
    var colls = null;
    
    for(var obj in req.collections) {      
      console.log(req.collections[obj].db_name);  
      if(req.collections[obj].db_name == req.dbName) {          
          if (!_.include(req.collections[obj].collections, id)) {                
             return res.redirect('/db/'+req.dbName);
         }
      }
    }
    
    
    req.collectionName = id;
    res.locals.collectionName = id;
    
    connections[req.dbName].collection(id, function(err, coll){
        if (err || coll == null) {
            console.log('Collection not found!');
            return res.redirect('/db/' + req.dbName);
        }        
        req.collection = coll;        
        next();        
    });
    
});

app.param('file', function(req, res, next, id) {
  mongodb.GridStore.DEFAULT_ROOT_COLLECTION = 'csv';
  if (id.length == 24) {
    try {      
      req._id = new mongodb.ObjectID.createFromHexString(id);      
      next();      
    } catch (err) {
      console.log(err);        
    }
  }            
});

//
app.param('document', function(req, res, next, id){
    if (id.length == 24) {
        try {
            id = new mongdb.ObjectID.createFromHexString(id);
        } catch (err) {
            
        }
    }        
    req.cpllection.findOne({_id:id}, function(err, doc) {
        if (err || doc == null) {
            return res.redirect('/db/' + req.dbName + '/' + req.collectionName);
        }        
        req.document = doc;
        res.locals.document = doc;        
        next();
    });    
});


var middleware = function(req, res, next) {
    req.databases = databases;
    req.collections = collections;           
    req.updateCollections = updateCollections;        
    next();
};

app.locals({
    databases:databases,
    collections:collections,
    baseHref:config.site.baseUrl
});


//Routes ......


//upload
app.get('/gridstore/:database/:file', middleware, routes.getFile);
app.get('/gridstore/:database', middleware, routes.listFile);
app.post('/gridstore/:database', middleware, routes.storeFile);

// document
app.get('/db/:database/:collection/:document', middleware, routes.viewDocument);

// collection
app.post('/db/:database/:collection', middleware, routes.addCollection);
app.get('/db/:database/:collection', middleware, routes.viewCollection);
app.put('/db/:database/:collection',middleware, routes.renameCollection);
app.del('/db/:database/:collection', middleware, routes.deleteCollection);

app.get('/db/:database', middleware, routes.viewDatabase);

app.get('/db', middleware, function(req, res) {
    //console.log(databases);
    var db_name_list = [];
    for(var key in databases) {
        db_name_list.push({'name':databases[key]});
    }
    //console.log(db_name_list);
    //console.log(collections);
    res.json(collections);
});

app.get('/', middleware, routes.index);




app.listen(config.site.port || 3000);

console.log("Mongo Express server listening on port " + (config.site.port || 3000));



//var server = app.listen(3000);
