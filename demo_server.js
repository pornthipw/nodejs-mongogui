var express = require("express");
var handlebars = require('hbs');
var passport = require('passport');
var mongo_con = require('mongo-connect');

var userdb = require('./user_db');
var routes = require('./routes');
var config = require('./config');
var utils = require('./utils');

var mssqldb = require('./mssql_db');
var mysqldb = require('./mysql_db');

var mssql = new mssqldb.azure_connect(config.azure_connect);
var paihos = new mysqldb.mysqldb(config.hospital_config);

var app = express();

var OpenIDStrategy = require('passport-openid').Strategy;

var userprofile = new userdb.userprofile(config.authorization.mongodb);
var mongo = mongo_con.Mongo(config.mongo_connect);

app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.favicon());
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/views');
  app.engine('html', handlebars.__express);
  app.set('view engine', 'html');
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());  	
});



passport.serializeUser(function(user, done) {
  userprofile.store(user, function(exists, user) {    
    done(null, user.identifier);
  });
});

passport.deserializeUser(function(identifier, done) {  
  userprofile.retrieve(identifier, function(exists, profile) {  
    if(profile) {      
      done(null, profile);
    } else {
      done(null, {identifier : identifier});
    }
  });
});

passport.use(new OpenIDStrategy({
  returnURL: config.site.baseUrl+'auth/openid/return',
  realm: config.site.baseUrl,
  profile: true}, function(identifier, profile, done) {
    process.nextTick(function () {    
      	return done(null, {identifier: identifier, profile:profile})
    });
  }
));

app.get('/pai_hospital/:table',paihos.list_table);

app.get('/auth/openid', 
	passport.authenticate('openid', { failureRedirect: '/login' }),
  		function(req, res) {
    		res.redirect(config.site.baseUrl);
});
  
app.get('/auth/openid/return', 
	passport.authenticate('openid', { failureRedirect: '/login' }),
  		function(req, res) {
    		res.redirect(config.site.baseUrl);
});

app.get('/user', function(req, res) {
  if(req.user) {
    res.json({'user':req.user});
  } else {
    res.json({'user':null});
  }
});

app.get('/logout', function(req, res){
  req.logOut();
  res.json({"success":true});
});

app.post('/csv/upload', routes.uploadFile);

app.get('/', function(req, res) {
  res.render('index', {baseHref:config.site.baseUrl});
});

app.get('/admin/users', userprofile.list_user);
app.get('/admin/users/:id', userprofile.get_user);
app.put('/admin/users/:id', userprofile.update_user);

//app.get('/query/:table',mssql.query);
app.get('/query',mssql.query);
app.post('/query',mssql.query_post);
/*
app.get('/query',function(req,res) {
  console.log('Hello');
  res.send('<h1>Query</h1>');
});
*/

app.get('/db/:collection/:id?', mongo.query);
app.post('/db/:collection', mongo.insert);
app.post('/mapreduce/:collection', mongo.mapreduce);
app.put('/db/:collection/:id', mongo.update);
app.del('/db/:collection/:id', mongo.delete);

function admin_role(req,res,next) {
  console.log('admin_role');
  if(req.user) {
    userprofile.check_role(req.user.identifier, ["admin"], function(allow) {
      if(allow) {
          next();
      } else {
          next(new Error("401"));
      }
    });
  } else {
    console.log('no user signin');
    next(new Error("401"));    
  }
}

app.use(function(err,req,res,next) {  
  if(err instanceof Error){    
    if(err.message === '401'){
      res.json({'error':401});
    }
  }
});




app.listen(config.site.port || 3000);

console.log("Mongo Express server listening on port " + (config.site.port || 3000));




//var server = app.listen(3000);
