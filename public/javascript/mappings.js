function CSVMapping() {
};

CSVMapping.map1 = function(config) { 
  console.log(config.csv.info);
  console.log(config.csv.list);
  var SQL = config.sql;

  TitleModel.list(SQL, function(title_list) {
    var tmp = [];
    tmp.push(config.csv.list[4]);
    angular.forEach(tmp, function(csv) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var title_id = '?';
      for(var idx=0;idx<title_list.rows.length;idx++) {
        if(csv.col1 == title_list.rows[idx].cols[1].value) {
          title_id = title_list.rows[idx].cols[0].value;
        }
      }
      var cid=csv.col4.replace(/-/g,'');
      var firstname = csv.col2;
      var lastname = csv.col3;
      var livehousenumber = csv.col15;
      var livemoonumber = csv.col16;
      var livevillagename = csv.col17;

      p_model.json.cols.push({'value':cid});
      p_model.json.cols.push({'value':title_id});
      p_model.json.cols.push({'value':firstname});
      p_model.json.cols.push({'value':lastname});
      p_model.json.cols.push({'value':undefined});
      p_model.json.cols.push({'value':undefined});
      p_model.json.cols.push({'value':undefined});
      p_model.json.cols.push({'value':undefined});
      p_model.json.cols.push({'value':undefined});
      p_model.json.cols.push({'value':undefined});
      p_model.json.cols.push({'value':undefined});
      p_model.json.cols.push({'value':undefined});
      p_model.json.cols.push({'value':undefined});
      p_model.json.cols.push({'value':undefined});
      p_model.json.cols.push({'value':undefined});
      p_model.json.cols.push({'value':livehousenumber});
      p_model.json.cols.push({'value':livemoonumber});
      p_model.json.cols.push({'value':livevillagename});
      p_model.save(SQL, function(res) {
        console.log(res);
      });
      return;
    });
  });

};

CSVMapping.map2 = function(config) { 
  console.log('+map2');
  console.log(config.csv.info);
  console.log(config.csv.list);
  var SQL = config.sql;

  var tmp = [];
  tmp.push(config.csv.list[10]);
  angular.forEach(tmp, function(csv) {
    var p_model = new PersonModel();
    p_model.json = {cols:[]};
    //console.log(csv);
    var cid = csv.col13;
    var result = csv.col7.split(" ");
    var firstname = result[0];
    var lastname = result[1];
    console.log(firstname);
    console.log(lastname);
    p_model.json.cols.push({'value':cid});
    p_model.json.cols.push({'value':undefined});
    p_model.json.cols.push({'value':firstname});
    p_model.json.cols.push({'value':lastname});
      p_model.save(SQL, function(res) {
        console.log(res);
      });
      return;
  });
};

function isValidThaiID(str) {
 // console.log(str);
  var pattern = /^(\d{13})?$/;
  return pattern.test(str);
}


CSVMapping.map3 = function(config, callback) { 
  //console.log(config.csv.info);
  //console.log(config.csv.list);
  var SQL = config.sql;
  TitleModel.list(SQL, function(title_list) {
 //  GenderModel.list(SQL, function(gender_list) {
        angular.forEach(config.csv.list, function(row) {
          if(isValidThaiID(row[12].value)) {
            var p_model = new PersonModel();
            p_model.json = {cols:[]};
            var title_id = '?';
            var gender_id = row[8].value;
            for(var idx=0;idx<title_list.rows.length;idx++) {
              if(row[5].value == title_list.rows[idx].cols[1].value) {
                title_id = title_list.rows[idx].cols[0].value;
              }
            }

            /*
            for(var idx=0;idx<gender_list.rows.length;idx++) {
              if(row[8].value == gender_list.rows[idx].cols[1].value) {
                gender_id = gender_list.rows[idx].cols[0].value;
              }
            }
            */

            p_model.set('title_id',title_id);
            p_model.set('gender_id',gender_id);
            p_model.set('cid',row[12].value);
            p_model.set('firstname',row[6].value);
            p_model.set('lastname',row[7].value);
            p_model.set('religion',row[22].value);
           // p_model.set('mariagestatus',row[23].value);

            p_model.save(SQL, function(res) {
              if(res.success) {
                p_model.get(SQL, row[12].value, function(result) {
                  console.log(p_model);
                  callback(true,p_model);
                });
              }
            }); 
          } else {
            console.log('Invalid CID '+row[12].value);
            callback(false,row);
          }
        });
   // }); 
  });
};


CSVMapping.map4 = function(config,callback) { 
  //console.log(config.csv.info);
 //console.log(config.csv.list);
 var SQL = config.sql;
  angular.forEach(config.csv.list, function(row) {
    if(isValidThaiID(row[2].value)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var result = row[1].value.split("  ");
      var firstname = result[0];
      var lastname = result[1];
      console.log(firstname);
      console.log(lastname);
      //var result_livenumber = row[3].value.split(" ");
      //var livehousenumber = result_livenumber[0];
      //var r2 = result_livenumber[1];
      //var r3 = result_livenumber[2];
      //var r4 = result_livenumber[3];
      //var livevillagename = r2+" "+r3;
      //console.log(livehousenumber);
      //console.log(r2);
      //console.log(r3);
      //console.log(livevillagename);
      //console.log(r4);
       console.log(row[2].value);
      //var cid=csv.col4.replace(/-/g,'');
      p_model.set('cid',row[2].value);
      p_model.set('firstname',firstname);
      p_model.set('lastname',lastname);
     // p_model.set('livehousenumber',livehousenumber);
      //p_model.set('livemoonumber',);
      //p_model.set('livevillagename',);
      
      p_model.save(SQL, function(res) {
        console.log(res);
        if(res.success) {
          p_model.get(SQL, row[2].value, function(result) {
            console.log(p_model);
            callback(true,p_model);
          });
        }
      }); 
      
    } else {
      console.log('Invalid CID '+row[2].value);
      console.log(row);
      callback(false,row);
    }
  });
};

CSVMapping.schema = [
 // {'name':'พม.- สรุปยอดผู้รับเบี้ยพิการ', 'function':CSVMapping.map1},
 // {'name':'กระทรวงสาธารณสุข - กายอุปกรณ์ ศรีสังวาลย์', 'function':CSVMapping.map2 },
  {
   'name':'กระทรวงสาธารณสุข - ข้อมูลผู้ป่วย_รพสต.ถ้ำลอด', 
   'function':CSVMapping.map3,
   'description': 'จะดึงข้อมูลจาก CSV file ใน column ที่ 12 ที่เก็บข้อมูลบัตรประชาชน' + 
      ' กับ Person.CID จากนั้น ดึงข้อมูลจาก Title.TitleID ที่มี Title.Description' +
      ' ตรงกับ Column ที่ 5 ที่เก็บคำนำหน้าชื่อ จากนั้นจะบันทึกในคอลัมน์ Person.Title' +
      ' สำหรับข้อมูลใน colume ที่ 6 ,7,8 และ 22 ที่เก๊บข้อมูล ชื่อ ,นามสกุล,เพศ และศาสนา ' +
      ' จะบันทึกลงในคอลัมน์ Person.FirstName ,Person.LastName Person.Gender ' +
      ' และPerson.Religion'+
      ' '
  },
  {'name':'กระทรวงศึกษาธิการ - สศศ1 โรงเรียนราชประชา 44', 'function':CSVMapping.map4 }
];
