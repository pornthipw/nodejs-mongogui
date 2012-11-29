var express = require("express");
var fs = require('fs');
var handlebars = require('hbs');
var mongodb = require('mongodb');
var _ = require('underscore');

var routes = require('./routes');
var config = require('./config');
var utils = require('./utils');

var app = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/views');
  app.engine('html', handlebars.__express);
  app.set('view engine', 'html');
  app.use(express.methodOverride());
});


app.post('/csv/upload', routes.uploadFile);


app.get('/', routes.index);

app.listen(config.site.port || 3000);

console.log("Mongo Express server listening on port " + (config.site.port || 3000));

//var server = app.listen(3000);
