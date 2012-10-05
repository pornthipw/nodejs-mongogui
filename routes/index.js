//Add routes from other files
var db = require('./database');
var coll = require('./collection');
var gridstore = require('./gridstore');

exports.viewDatabase = db.viewDatabase;
exports.dropDatabase = db.dropDatabase;

exports.addCollection = coll.addCollection;
exports.deleteCollection = coll.deleteCollection;
exports.viewCollection = coll.viewCollection;
exports.renameCollection = coll.renameCollection;

exports.storeFile = gridstore.storeFile;
exports.listFile = gridstore.listFile;
exports.getFile = gridstore.getFile;

// exports.viewDocument = doc.viewDocument;
exports.index = function(req, res) {
  var ctx = {
    title: 'Mongo Express',
  };
  //console.log('request index.js');
  res.render('index', ctx);
}