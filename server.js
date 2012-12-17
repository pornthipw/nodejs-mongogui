var express = require("express");
var handlebars = require('hbs');
var passport = require('passport');
var mongo_con = require('mongo-connect');

var userdb = require('./user_db');
var routes = require('./routes');
var config = require('./config');
var utils = require('./utils');

var app = express();
var OpenIDStrategy = require('passport-openid').Strategy;

var userprofile = new userdb.userprofile({
  host:config.authorization.mongodb.server, 
  port:config.authorization.mongodb.port,
  db:config.authorization.mongodb.db,
  collection_name:config.authorization.mongodb.collection_name
});

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


app.use(function(err,req,res,next) {
    if(err instanceof Error){
        if(err.message === '401'){
            res.json({'error':401});
            //res.render();
        }
    }
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

app.get('/', routes.index);

app.get('/db/:collection/:id?', mongo.query);
app.post('/db/:collection', mongo.insert);
app.put('/db/:collection/:id', mongo.update);
app.del('/db/:collection/:id', mongo.delete);

app.listen(config.site.port || 3000);

console.log("Mongo Express server listening on port " + (config.site.port || 3000));

//var server = app.listen(3000);
