//Add routes from other files
var db = require('./database');

exports.viewDatabase = db.viewDatabase;

exports.index = function(req, res) {
    var ctx = {
       title : 'Mongo Express', 
    };
    res.render('index', ctx);
}
