var http = require('http');
var querystring = require('querystring');
var net = require('net');
var url = require('url');

var data = querystring.stringify({
  username:'root',
  password:'isylzjko'
});

var options = {
  hostname: 'www.paihospital.com',
  path :'/pma/',
  method : 'GET',
  /*
  headers : {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': data.length
  }
  */
};

var req = http.request(options, function(res) {
  console.log('STATUS: '+res.statusCode);
  console.log('HEADER: '+JSON.stringify(res.headers));
  res.on('data', function(chunk) {
    console.log('Body :'+chunk);
  });
});

req.on('error', function(e) {
  console.log('Problem with request:'+e.message);
});

req.end();
