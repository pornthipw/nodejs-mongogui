exports.index = function(req, res) {
    var ctx = {
       title : 'Mongo Express', 
    };
    res.render('index', ctx);
}
