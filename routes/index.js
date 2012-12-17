//Add routes from other files

var csv = require('ya-csv');

exports.uploadFile = function(req, res) {
  console.log(req.files.file);
  if(req.files.file) {
    var content = [];
    try {
      var reader = csv.createCsvFileReader(req.files.file.path);
      reader.addListener('data', function(data) {
        var list = [];
        for(var col=0;col<data.length;col++) {
          list.push({'value':data[col]});
        }
        content.push(list);
      });
    
      reader.addListener('error', function() {
        res.send(JSON.stringify({'success':false}));
      });

      reader.addListener('end', function() {
        res.send(JSON.stringify({'success':true,'csv':content}));
      });
    } catch(err) {
      res.send(JSON.stringify({'success':false}));
    }
  }
}

// exports.viewDocument = doc.viewDocument;
exports.index = function(req, res) {
  var ctx = {
    title: 'Mongo Express',
  };
  //console.log('request index.js');
  res.render('index', ctx);
}
