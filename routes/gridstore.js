var mongodb = require('mongodb');
var config = require('../config');

exports.listFile = function(req, res, next) {
  var file_list = [];
  console.log('requesting list files');
  mongodb.GridStore.list(req.db, 'csv', function(err, items) {
    items.forEach(function(filename) {
      file_list.push({'name':filename});
    });
    res.json(file_list);
  });


};

exports.storeFile = function(req, res, next) {
  console.log(req.files.file);
  if(req.files.file) {  
    var gridStore = new mongodb.GridStore(req.db, new mongodb.ObjectID(),req.files.file.name, 'w', {root:'csv'});
    console.log(req.files.file);
    gridStore.open(function(err, gridStore) {
      gridStore.writeFile(req.files.file.path, function(err, doc) {                
        if(err) {
          console.log(err);
          res.send(JSON.stringify({success:false}));              
        }

        gridStore.close(function(err, result) {
          if(err) {
            console.log(err);
            res.send(JSON.stringify({success:false}));              
          }
          console.log("Success!");
          res.send(JSON.stringify({success:true}));  
        });
      });
    });
  }
};


