var title_map = require('./title').mapping;
var religion_map = require('./religion').mapping;
var gender_map = require('./gender').mapping;
var province_map = require('./province').mapping;
var bloodtype_map = require('./bloodtype').mapping;
var nation_map = require('./nation').mapping;

title_map.map('สามเณร',function(res) {
 console.log(res);
 religion_map.map(3, function(r2) {
  console.log(r2);
  gender_map.map(1, function(r3) {
   console.log(r3);
   bloodtype_map.map(01, function(r4) {
    console.log(r4);
    nation_map.map(1, function(r5) {
     console.log(r5);
    });
   });
  });
 });
});
