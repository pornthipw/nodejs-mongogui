var mongodb = require('mongodb');
var csv = require('ya-csv');
var config = require('../config');

exports.listFile = function(req, res, next) {
  var file_list = [];
  console.log('requesting list files');
  mongodb.GridStore.DEFAULT_ROOT_COLLECTION = 'csv';
  mongodb.GridStore.list(req.db, {id:true}, function(err, items) {
    if(err) {
      console.log(err);
    }
    console.log(items);
    items.forEach(function(filename) {
      console.log(filename);
      file_list.push({'name':filename});
    });
    res.json(file_list);    
  });  
};

exports.getFile = function(req, res, next) {
  console.log('reguesting getFile from gridstore.js');      
  
  var gridStore = new mongodb.GridStore(req.db, req._id, "r");
  gridStore.open(function(err, gs) {
    if(err) {
      console.log(err);
    }
    var stream = gs.stream(true);
    var content = [];
    var reader = csv.createCsvStreamReader(); 
    reader.addListener('data', function(data) {
      var row = {};
      for(var idx in data) {
        row['col'+idx]=data[idx];
      }
      // console.log('reader data '+JSON.stringify(row));
      content.push(row);
    });
    
    reader.addListener('end', function() {
      res.json(content);
    });    
    
    reader.addListener('error', function(data) {
        console.log('error data' + data);
    });

    // Register events
    stream.on("data", function(chunk) {
      // Record the length of the file
      // console.log('data');      
      // console.log(chunk.toString());
      var str = chunk.toString('utf8')
      console.log(str);
      reader.parse(str);
    });

    stream.on("end", function() {
      // Record the end was called
      // console.log('end');
      reader.end();
    });
  });
      
  // var reader = csv.createCsvStreamReader(stream);  
  // res.end();
  
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


