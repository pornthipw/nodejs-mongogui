var fs = require('fs');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();

parser.addListener('end', function(result) {
  console.log(result);
});

fs.readFile('/tmp/0ea823be98419d711e1154485fe092a2', function(err, data) {
  parser.parseString(data);
});


