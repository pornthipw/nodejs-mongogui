//Add routes from other files
var db = require('./database');
var coll = require('./collection');

exports.viewDatabase = db.viewDatabase;
exports.addCollection = coll.addCollection;
exports.deleteCollection = coll.deleteCollection;
exports.viewCollection = coll.viewCollection;
exports.renameCollection = coll.renameCollection;


exports.viewDocument = doc.viewDocument;

exports.index = function(req, res) {
    var ctx = {
       title : 'Mongo Express', 
    };
    //console.log('request index.js');
    res.render('index', ctx);
}
