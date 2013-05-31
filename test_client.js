var http = require('http');
var querystring = require('querystring');
var net = require('net');
var url = require('url');

var data = querystring.stringify({
  username:'Sermsak K.',
  password:'123456'
});

var options = {
  hostname: 'ossprovince.m-society.go.th',
  //path :'/oss/oss/login',
  path :'/oss/oss/login/wicket:interface/:0:signInPanel:signInForm::IFormSubmitListener::/',
 // hostname: 'www.db.grad.nu.ac.th',
 // path :'/',
  method : 'POST',
  headers : {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': data.length
  }
};

var req = http.request(options, function(res) {
  console.log('STATUS: '+res.statusCode);
  console.log('HEADER: '+JSON.stringify(res.headers));
  var cookies = {};
  res.headers['set-cookie'][0].split(';').forEach(function(cookie) {
    var parts = cookie.split('=');
    cookies[parts[0].trim()] = (parts[1]||'').trim();
  });
  console.log(cookies);
  var obj = url.parse(res.headers.location);
  console.log(obj);
  console.log('Requesting :'+obj.path);
  var a_req = http.request({
    hostname:obj.hostname,
    path:'/oss/oss/app?wicket:bookmarkablePage=:com.dse.oss.web.search.SearchDataPage',
    method :'GET',
    headers : {
      'Cookie':'JSESSIONID='+cookies.JSESSIONID
    }
  }, function(a_res) {
    a_res.on('data', function(chunk) {
      console.log('Body :'+chunk);
    });
  });
  a_req.end();
 /* 
  http.get(res.headers.location, function(r_res) {
    console.log('Got Response: '+r_res.statusCode);
    r_res.on('data', function(chunk) {
      console.log('Body R :'+chunk);
      req.end();
    });
  });
 */
  

  /*
  res.on('data', function(chunk) {
    console.log('Body :'+chunk);
  });
  */
});

req.on('error', function(e) {
  console.log('Problem with request:'+e.message);
});

req.write(data);
req.end();
