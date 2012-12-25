//Add routes from other files

var csv = require('ya-csv');

exports.uploadFile = function(req, res) {
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
    
      reader.addListener('error', function(error) {
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
