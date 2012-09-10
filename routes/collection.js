var config = require('../config');


exports.viewCollection = function(req, res, next) {
    //var limit = config.options.documentsPerpage;
    //var skip = parseInt(req, query, skip, 10) || 0;
    
    var query_option = {
        //limit: limit,
        //skip: skip
    };


    req.params.collection.find({}, query_option).toArray(function(err, items){
   // req.params.collection.find({}, query_option).toArray(function(err, items){
           // res.render('collection', ctx);
    });
    //});
};


exports.addCollection = function(req, res, next) {
  var name = req.params.collection;
  //var name = req.collection;

  if (name === undefined || name.length == 0) {
    req.session.error = "You forgot to enter a collection name!";
    return res.redirect('back');
  }

  //Collection names must begin with a letter or underscore, and can contain only letters, underscores, numbers or dots
  if (!name.match(/^[a-zA-Z_][a-zA-Z0-9\._]*$/)) {
    req.session.error = "That collection name is invalid.";
    return res.redirect('back');
  }

  req.db.createCollection(name, function(err, collection) {
    if (err) {
      req.session.error = "Something went wrong: " + err;
      console.error(err);
      return res.redirect('back');
    }

    
    req.updateCollections(req.db, req.dbName, function() {
        // req.session.success = 'Collection created!';
        res.redirect('/db/' + req.dbName + '/' + name);
    });
  });
};

exports.deleteCollection = function(req, res, next) {
  req.params.collection.drop(function(err, result) {
    if (err) {
      req.session.error = "Something went wrong: " + err;
      console.error(err);
      return res.redirect('back');
    }

    //If delete was successful, result === true

    req.updateCollections(req.db, req.dbName, function(err) {
      if (err) {
        req.session.error = "Something went wrong: " + err;
        console.error(err);
        return res.redirect('back');
      }

      //req.session.success = "Collection  '" + req.collectionName + "' deleted!";
      res.redirect('/db/' + req.dbName);
    });
  });
};
