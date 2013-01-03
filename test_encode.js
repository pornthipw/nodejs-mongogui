var util = require('./utils');
var fs = require('fs');


fs.readFile('/home/pornthip/test.csv', function(err,data) {
  console.log(data);
  util.cp874_to_utf8(data,function(utftext) {
    console.log(utftext);
  });
});
