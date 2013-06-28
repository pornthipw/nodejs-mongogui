function CSVMapping() {
};

function isValidThaiID(str) {
 //var pattern = /^(\d{13})?$/;
 //console.log(str);
 //return pattern.test(str);
  
  var pattern = /^(\d{13})?$/;
  m = str.replace(/\s/,'');
  if(m.length==0) {
    return false;
  }  else {
    console.log(m+' '+pattern.test(m));
    return pattern.test(m);
  }
  
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
            var gender_result = row[8].value;
            if (gender_result == 'ชาย') {
              var gender_id = 'M';  
            } else {
              var gender_id = 'F';  
            } 
            for(var idx=0;idx<title_list.rows.length;idx++) {
              if(row[5].value == title_list.rows[idx].cols[1].value) {
                title_id = title_list.rows[idx].cols[0].value;
              }
            }

            p_model.set('title_id',title_id);
            p_model.set('gender_id',gender_id);
            p_model.set('cid',row[12].value);
            p_model.set('livemoonumber',row[3].value);
            p_model.set('livehousenumber',row[4].value);
            p_model.set('firstname',row[6].value);
            p_model.set('lastname',row[7].value);
            p_model.set('religion',row[22].value);

            var log_f = function(res) {
              console.log(res);
            };

            p_model.save(SQL, function(res) {
              if(res.success) {
                p_model.get(SQL, row[12].value, function(result) {
                  console.log(p_model);
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'อายุ(ปี)', row[8].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'อายุ(เดือน)', row[9].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'วันเกิด', row[11].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'รหัสสิทธิ์', row[13].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'สิทธิ์การรักษา', row[14].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'Update สิทธิ์ครั้งสุดท้าย', row[15].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'มีทะเบียนบ้าน', row[16].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'ทะเบียนบ้าน', row[17].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'ระดับการศึกษา', row[18].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'อาชึพ', row[19].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'โรคประจำตัว', row[20].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'การรวมกลุ่ม/ชมรม', row[21].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'สถานภาพสมรส', row[23].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'บิดา', row[24].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'มารดา', row[25].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'คู่สมรส', row[26].value,function(res) {
                    p_model.gen_attr_log = '';
                    p_model.gen_attr_log += 'อายุ(ปี) ='+row[9].value+'\n';
                    p_model.gen_attr_log += 'อายุ(เดือน) ='+row[10].value+'\n';
                    p_model.gen_attr_log += 'วันเกิด ='+row[11].value+'\n';
                    p_model.gen_attr_log += 'รหัสสิทธิ์ ='+row[13].value+'\n';
                    p_model.gen_attr_log += 'สิทธิ์การรักษา ='+row[14].value+'\n';
                    p_model.gen_attr_log += 'Update สิทธิ์ครั้งสุดท้าย ='+row[15].value+'\n';
                    p_model.gen_attr_log += 'มีทะเบียนบ้าน ='+row[16].value+'\n';
                    p_model.gen_attr_log += 'ทะเบียนบ้าน ='+row[17].value+'\n';
                    p_model.gen_attr_log += 'ระดับการศึกษา ='+row[18].value+'\n';
                    p_model.gen_attr_log += 'อาชึพ ='+row[19].value+'\n';
                    p_model.gen_attr_log += 'โรคประจำตัว ='+row[20].value+'\n';
                    p_model.gen_attr_log += 'การรวมกลุ่ม/ชมรม ='+row[21].value+'\n';
                    p_model.gen_attr_log += 'สถานภาพสมรส ='+row[23].value+'\n';
                    p_model.gen_attr_log += 'บิดา ='+row[24].value+'\n';
                    p_model.gen_attr_log += 'มารดา ='+row[25].value+'\n';
                    p_model.gen_attr_log += 'คู่สมรส ='+row[26].value+'\n';
                    callback(true,p_model);
                  });
                  });
                  });
                  });
                  });
                  });
                  });
                  });
                  });
                  });
                  });
                  });
                  });
                  });
                  });
                  });
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
  
  ProvinceModel.list(SQL, function(province_list) {
  angular.forEach(config.csv.list, function(row) {
    if(isValidThaiID(row[2].value)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var result = row[1].value.split("  ");
      var firstname = result[0];
      var lastname = result[1];
      var province_id = '?';
      //console.log(firstname);
      //console.log(lastname);
      for(var idx=0;idx<province_list.rows.length;idx++) {
        if(row[5].value == province_list.rows[idx].cols[1].value) {
          province_id = province_list.rows[idx].cols[0].value;
        }
      }
      var result_livenumber = row[3].value.split(" ");
      var livehousenumber = result_livenumber[0];
      var r2 = result_livenumber[1];
      var r3 = result_livenumber[2];
      var r4 = result_livenumber[3];
      var tumbon=r4.replace(/ต./g,'');
      var livemoonumber = r2+" "+r3;
      console.log(livehousenumber);
      console.log(tumbon);
      //var cid=csv.col4.replace(/-/g,'');
      p_model.set('cid',row[2].value);
      p_model.set('firstname',firstname);
      p_model.set('lastname',lastname);
      p_model.set('liveprovince',province_id);
      //p_model.set('livecity',city_id);
      p_model.set('livehousenumber',livehousenumber);
      p_model.set('livemoonumber',livemoonumber);
      //p_model.set('livevillagename',);
      
      p_model.save(SQL, function(res) {
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
 });
};

CSVMapping.map5 = function(config,callback) { 
  //console.log(config.csv.info);
 //console.log(config.csv.list);
 var SQL = config.sql;
  
  ProvinceModel.list(SQL, function(province_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[3].value.replace(/-/g,'');
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var result = row[2].value.split("  ");
      var firstname = result[0];
      var lastname = result[1];
      var province_id = '?';
      //console.log(firstname);
      //console.log(lastname);
      for(var idx=0;idx<province_list.rows.length;idx++) {
        if(row[11].value == province_list.rows[idx].cols[1].value) {
          province_id = province_list.rows[idx].cols[0].value;
        }
      }
      var result_livenumber = row[8].value.split(" ");
      var livehousenumber = result_livenumber[0];
      var livemoonumber = result_livenumber[1];
      var livevillagename = result_livenumber[2];
      //var cid=csv.col4.replace(/-/g,'');
      p_model.set('cid',cid);
      p_model.set('firstname',firstname);
      p_model.set('lastname',lastname);
      p_model.set('liveprovince',province_id);
      //p_model.set('livecity',city_id);
      p_model.set('livehousenumber',livehousenumber);
      p_model.set('livemoonumber',livemoonumber);
      p_model.set('livevillagename',livevillagename);
      
      p_model.save(SQL, function(res) {
        if(res.success) {
          p_model.get(SQL, cid, function(result) {
            console.log(p_model);
            callback(true,p_model);
          });
        }
      }); 
      
    } else {
      console.log('Invalid CID '+cid);
      console.log(row);
      callback(false,row);
    }
  });
 });
};


CSVMapping.map6 = function(config, callback) { 
  var SQL = config.sql;
  TitleModel.list(SQL, function(title_list) {
 //  GenderModel.list(SQL, function(gender_list) {
        angular.forEach(config.csv.list, function(row) {
          var cid=row[4].value.replace(/-/g,'');
          if(isValidThaiID(cid)) {
            var p_model = new PersonModel();
            p_model.json = {cols:[]};
            var title_id = '?';
            for(var idx=0;idx<title_list.rows.length;idx++) {
              if(row[1].value == title_list.rows[idx].cols[1].value) {
                title_id = title_list.rows[idx].cols[0].value;
              }
            }

            p_model.set('title_id',title_id);
            p_model.set('cid',cid);
            p_model.set('firstname',row[2].value);
            p_model.set('lastname',row[3].value);
           // p_model.set('mariagestatus',row[23].value);

            p_model.save(SQL, function(res) {
              if(res.success) {
                p_model.get(SQL, cid, function(result) {
                  console.log(p_model);
                  callback(true,p_model);
                });
              }
            }); 
          } else {
            console.log('Invalid CID '+cid);
            callback(false,row);
          }
        });
   // }); 
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
  {
   'name':'กระทรวงศึกษาธิการ - สศศ1 โรงเรียนราชประชา 44', 
   'function':CSVMapping.map4, 
   'description': 'จะดึงข้อมูลจาก CSV file ใน column ที่ 3 ที่เก็บข้อมูลบัตรประชาชน' + 
      ' กับ Person.CID จากนั้น ดึงข้อมูลจาก CSV file ใน colume ที่ 2 ที่เก็บชื่อและนามสกุล' +
      ' แล้วนำมาแยกให้เป็น 2 colume ก่อนเก็บใน Person.FirstName และ Person.LastName' +
      ' จากนั้น แยก colume ที่ 3 ใน CSV file  ที่เก๊บข้อมูล บ้านเลขที่ หมู่ และตำบล ให้เป็น 3 ' +
      ' colume เพื่อเก็บใน Person.LiveHouseNumber, Peerson.LiveMooNumber' +
      ' สำหรับข้อมูลตำบล ต้องตัดคำว่า ต. ออกด้วยการ replace ค่า ก่อนที่จำนำไปตรวจสอบกับ Tumbon' +
      ' สำหรับข้อมูล CSV file ใน colume ที่ 6 ที่เก็บข้อมูล จังหวัด จะดึงข้อมูลจาก'+
      ' Province.ProvinceDescription = csv.column6 เพื่อดึง Province.ProvinceID' +
      ' แล้วจะบันทึก Province.ProvinceID ลงใน Person.LiveProvince ' +
      ' '+
      ' '
  },
  {
   'name':'ศูนย์การศึกษาพิเศษ', 
   'function':CSVMapping.map5 
  },
  {
   'name':'ผู้สูงอายุบำนาญ - สรุปยอดผู้รับเบี้ยพิการ', 
   'function':CSVMapping.map6 
  }
];
