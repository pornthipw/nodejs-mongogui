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


CSVMapping.map1 = function(config, callback) { 
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
                  'ชื่อบิดา', row[24].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'ชื่อมารดา', row[25].value,function(res) {
                  GeneralAttributesModel.push(SQL,row[12].value,
                  'คู่สมรส', row[26].value,function(res) {
                    p_model.gen_attr_log = '';
                    p_model.gen_attr_log += 'อายุ(ปี) ='+row[9].value+'\n\r';
                    p_model.gen_attr_log += 'อายุ(เดือน) ='+row[10].value+'\n\r';
                    p_model.gen_attr_log += 'วันเกิด ='+row[11].value+'\r\n';
                    p_model.gen_attr_log += 'รหัสสิทธิ์ ='+row[13].value+'\r\n';
                    p_model.gen_attr_log += 'สิทธิ์การรักษา ='+row[14].value+'\r\n';
                    p_model.gen_attr_log += 'Update สิทธิ์ครั้งสุดท้าย ='+row[15].value+'\r\n';
                    p_model.gen_attr_log += 'มีทะเบียนบ้าน ='+row[16].value+'\r\n';
                    p_model.gen_attr_log += 'ทะเบียนบ้าน ='+row[17].value+'\r\n';
                    p_model.gen_attr_log += 'ระดับการศึกษา ='+row[18].value+'\r\n';
                    p_model.gen_attr_log += 'อาชึพ ='+row[19].value+'\r\n';
                    p_model.gen_attr_log += 'โรคประจำตัว ='+row[20].value+'\r\n';
                    p_model.gen_attr_log += 'การรวมกลุ่ม/ชมรม ='+row[21].value+'\r\n';
                    p_model.gen_attr_log += 'สถานภาพสมรส ='+row[23].value+'\r\n';
                    p_model.gen_attr_log += 'ชื่อบิดา ='+row[24].value+'\r\n';
                    p_model.gen_attr_log += 'ชื่อมารดา ='+row[25].value+'\r\n';
                    p_model.gen_attr_log += 'คู่สมรส ='+row[26].value+'\r\n';
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


CSVMapping.map2 = function(config,callback) { 
  //console.log(config.csv.info);
 //console.log(config.csv.list);
 var SQL = config.sql;
  
  ProvinceModel.list(SQL, function(province_list) {
  angular.forEach(config.csv.list, function(row) {
    if(isValidThaiID(row[2].value)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var province_id = '?';
      var city_id = '?';
      var tumbon_id = '?';
      //console.log(firstname);
      //console.log(lastname);
      for(var idx=0;idx<province_list.rows.length;idx++) {
        if(row[5].value == province_list.rows[idx].cols[1].value) {
          province_id = province_list.rows[idx].cols[0].value;
          ProvinceModel.get_cities(SQL, province_id, function(cities) {
            var result = row[1].value.split("  ");
            var firstname = result[0];
            var lastname = result[1];
            var result_livenumber = row[3].value.split(" ");
            var livehousenumber = result_livenumber[0];
            var r2 = result_livenumber[1];
            var r3 = result_livenumber[2];
            var r4 = result_livenumber[3];
            var tumbon=r4.replace(/ต./g,'');
            var livemoonumber = r2+" "+r3;
            for (var idx=0;idx<cities.rows.length;idx++) {
              if (cities.rows[idx].cols[1].value == row[4].value) {
                city_id = cities.rows[idx].cols[0].value; 
                ProvinceModel.get_tumbons(SQL, city_id, function(tumbons) {
                  for (var idx=0;idx<tumbons.rows.length;idx++) {
                    if (tumbons.rows[idx].cols[1].value == tumbon) {
                      tumbon_id = tumbons.rows[idx].cols[0].value; 
                      console.log(tumbon_id);
                    }
                  }
                  p_model.set('cid',row[2].value);
                  p_model.set('firstname',firstname);
                  p_model.set('lastname',lastname);
                  p_model.set('liveprovince',province_id);
                  p_model.set('livecity',city_id);
                  p_model.set('livetumbon',tumbon_id);
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

                  var log_f = function(res) {
                    console.log(res);
                  };

                  p_model.save(SQL, function(res) {
                    console.log('P_model.save ');
                    console.log(res);
                    if(res.success) {
                      p_model.get(SQL, row[2].value, function(result) {
                        console.log(p_model);
                        GeneralAttributesModel.push(SQL,row[2].value,
                        'ชื่อบิดา', row[7].value,log_f);
                        GeneralAttributesModel.push(SQL,row[2].value,
                        'ชื่อมารดา', row[8].value,log_f);
                        p_model.gen_attr_log = '';
                        p_model.gen_attr_log += 'ชื่อบิดา ='+row[7].value+'\n\r';
                        p_model.gen_attr_log += 'ชื่อมารดา ='+row[8].value+'\n\r';
                        GeneralAttributesModel.push(SQL,row[2].value,
                        'ปัจจุบันนักเรียนเรียนอยู่ชั้น', row[10].value,log_f);
                        GeneralAttributesModel.push(SQL,row[2].value,
                        'ปัจจุบันเป็นนักเรียนประเภท', row[11].value,log_f);
                        GeneralAttributesModel.push(SQL,row[2].value,
                        'จำแนกตามประเภท', row[13].value,log_f);
                        GeneralAttributesModel.push(SQL,row[2].value,
                        'ผู้ปกครองส่งโรงเรียน', row[15].value,log_f);
                          p_model.gen_attr_log = '';
                          p_model.gen_attr_log += 'ชื่อบิดา ='+row[7].value+'\n\r';
                          p_model.gen_attr_log += 'ชื่อมารดา ='+row[8].value+'\n\r';
                          p_model.gen_attr_log += 'ปัจจุบันนักเรียนเรียนอยู่ชั้น ='+row[10].value+'\n\r';
                          p_model.gen_attr_log += 'ปัจจุบันเป็นนักเรียนประเภท ='+row[11].value+'\n\r';
                          p_model.gen_attr_log += 'จำแนกตามประเภท ='+row[13].value+'\n\r';
                          p_model.gen_attr_log += 'ผู้ปกครองส่งโรงเรียน ='+row[15].value+'\n\r';
                          callback(true,p_model);
                        /*
                        GeneralAttributesModel.push(SQL,row[2].value,
                        'ชื่อบิดา', row[7].value,function(res) {
                        GeneralAttributesModel.push(SQL,row[2].value,
                        'ชื่อมารดา', row[8].value,function(res) {
                        GeneralAttributesModel.push(SQL,row[2].value,
                        'ปัจจุบันนักเรียนเรียนอยู่ชั้น', row[10].value,function(res) {
                        GeneralAttributesModel.push(SQL,row[2].value,
                        'ปัจจุบันเป็นนักเรียนประเภท', row[11].value,function(res) {
                        GeneralAttributesModel.push(SQL,row[2].value,
                        'จำแนกตามประเภท', row[13].value,function(res) {
                        GeneralAttributesModel.push(SQL,row[2].value,
                        'ผู้ปกครองส่งโรงเรียน', row[15].value,function(res) {
                          p_model.gen_attr_log = '';
                          p_model.gen_attr_log += 'ชื่อบิดา ='+row[7].value+'\n\r';
                          p_model.gen_attr_log += 'ชื่อมารดา ='+row[8].value+'\n\r';
                          p_model.gen_attr_log += 'ปัจจุบันนักเรียนเรียนอยู่ชั้น ='+row[10].value+'\n\r';
                          p_model.gen_attr_log += 'ปัจจุบันเป็นนักเรียนประเภท ='+row[11].value+'\n\r';
                          p_model.gen_attr_log += 'จำแนกตามประเภท ='+row[13].value+'\n\r';
                          p_model.gen_attr_log += 'ผู้ปกครองส่งโรงเรียน ='+row[15].value+'\n\r';
                          callback(true,p_model);

                        });
                        });
                        });
                        });
                        });
                        });
                        */
                      });
                     }
                   });
                });
              }
            }
          });
        }
      }
      
    } else {
      console.log('Invalid CID '+row[2].value);
      console.log(row);
      callback(false,row);
    }
  });
 });
};

CSVMapping.map3 = function(config,callback) { 
  //console.log(config.csv.info);
 //console.log(config.csv.list);
 var SQL = config.sql;
  
  ProvinceModel.list(SQL, function(province_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[3].value.replace(/-/g,'');
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var province_id = '?';
      var city_id = '?';
      var tumbon_id = '?';
      //console.log(lastname);
      
      for(var idx=0;idx<province_list.rows.length;idx++) {
        if(row[11].value == province_list.rows[idx].cols[1].value) {
          province_id = province_list.rows[idx].cols[0].value;
          // Tor
          ProvinceModel.get_cities(SQL, province_id, function(cities) {
            var result = row[2].value.split("  ");
            var firstname = result[0];
            var lastname = result[1];
            for (var idx=0;idx<cities.rows.length;idx++) {
              if (cities.rows[idx].cols[1].value == row[10].value) {
                city_id = cities.rows[idx].cols[0].value; 
                ProvinceModel.get_tumbons(SQL, city_id, function(tumbons) {
                  for (var idx=0;idx<tumbons.rows.length;idx++) {
                    if (tumbons.rows[idx].cols[1].value == row[9].value) {
                      tumbon_id = tumbons.rows[idx].cols[0].value; 
                      console.log(tumbon_id);
                    }
                  }
                  console.log(tumbons);
                  var result_livenumber = row[8].value.split(" ");
                  var livehousenumber = result_livenumber[0];
                  var livemoonumber = result_livenumber[1];
                  var livevillagename = result_livenumber[2];
                  //var cid=csv.col4.replace(/-/g,'');
                  p_model.set('cid',cid);
                  p_model.set('firstname',firstname);
                  p_model.set('lastname',lastname);
                  p_model.set('liveprovince',province_id);
                  p_model.set('livecity',city_id);
                  p_model.set('livetumbon',tumbon_id);
                  p_model.set('livehousenumber',livehousenumber);
                  p_model.set('livemoonumber',livemoonumber);
                  p_model.set('livevillagename',livevillagename);
      
                  p_model.save(SQL, function(res) {
                    if(res.success) {
                      p_model.get(SQL, cid, function(result) {
                        //console.log(p_model);
                        callback(true,p_model);
                      });
                    }
                  }); 

                  var log_f = function(res) {
                    console.log(res);
                  };

                  p_model.save(SQL, function(res) {
                    if(res.success) {
                      p_model.get(SQL, cid, function(result) {
                        console.log(p_model);
                        GeneralAttributesModel.push(SQL,cid,
                        'วัน เืดอน ปีเกิด', row[4].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'อายุ', row[5].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'ชื่อบิดา', row[6].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'ชื่อมารดา', row[7].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'ชื่อ-นามสกุลผู้ปกครองนักเรียนที่ไม่ใช่บิดา/มารดา', row[12].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'จำแนกตามประเภทความบกพร่อง/พิการ(ระบุเป็นตัวเลข)', row[13].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'รูปแบบที่ได้รับบริการการศึกษา', row[14].value,log_f);
                          p_model.gen_attr_log = '';
                          p_model.gen_attr_log += 'วัน เดือน ปีเกิด ='+row[4].value+'\n\r';
                          p_model.gen_attr_log += 'อายุ ='+row[5].value+'\n\r';
                          p_model.gen_attr_log += 'ชื่อบิดา ='+row[6].value+'\n\r';
                          p_model.gen_attr_log += 'ชื่อมารดา ='+row[7].value+'\n\r';
                          p_model.gen_attr_log += 'ชื่อ-นามสกุลผู้ปกครองนักเรียนที่ไม่ใช่บิดา/มารดา ='+row[12].value+'\n\r';
                          p_model.gen_attr_log += 'จำแนกตามประเภทความบกพร่อง/พิการ(ระบุเป็นตัวเลข) ='+row[13].value+'\n\r';
                          p_model.gen_attr_log += 'รูปแบบที่ได้รับบริการการศึกษา ='+row[14].value+'\n\r';
                          callback(true,p_model);

                        /*GeneralAttributesModel.push(SQL,cid,
                        'วัน เืดอน ปีเกิด', row[4].value,function(res) {
                        GeneralAttributesModel.push(SQL,cid,
                        'อายุ', row[5].value,function(res) {
                        GeneralAttributesModel.push(SQL,cid,
                        'ชื่อบิดา', row[6].value,function(res) {
                        GeneralAttributesModel.push(SQL,cid,
                        'ชื่อมารดา', row[7].value,function(res) {
                        GeneralAttributesModel.push(SQL,cid,
                        'ชื่อ-นามสกุลผู้ปกครองนักเรียนที่ไม่ใช่บิดา/มารดา', row[12].value,function(res) {
                        GeneralAttributesModel.push(SQL,cid,
                        'จำแนกตามประเภทความบกพร่อง/พิการ(ระบุเป็นตัวเลข)', row[13].value,function(res) {
                        GeneralAttributesModel.push(SQL,cid,
                        'รูปแบบที่ได้รับบริการการศึกษา', row[14].value,function(res) {

                          p_model.gen_attr_log = '';
                          p_model.gen_attr_log += 'วัน เดือน ปีเกิด ='+row[4].value+'\n\r';
                          p_model.gen_attr_log += 'อายุ ='+row[5].value+'\n\r';
                          p_model.gen_attr_log += 'ชื่อบิดา ='+row[6].value+'\n\r';
                          p_model.gen_attr_log += 'ชื่อมารดา ='+row[7].value+'\n\r';
                          p_model.gen_attr_log += 'ชื่อ-นามสกุลผู้ปกครองนักเรียนที่ไม่ใช่บิดา/มารดา ='+row[12].value+'\n\r';
                          p_model.gen_attr_log += 'จำแนกตามประเภทความบกพร่อง/พิการ(ระบุเป็นตัวเลข) ='+row[13].value+'\n\r';
                          p_model.gen_attr_log += 'รูปแบบที่ได้รับบริการการศึกษา ='+row[14].value+'\n\r';
                          callback(true,p_model);

                        });
                        });
                        });
                        });
                        });
                        });
                        });
                        */
                      });
                    }
                  });
                });
              } 
            }
          });
        }
      }
      
    } else {
      console.log('Invalid CID '+cid);
      //console.log(row);
      callback(false,row);
    }
  });
 });
};



CSVMapping.map4 = function(config, callback) { 
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
            p_model.set('livehousenumber',row[5].value);
            p_model.set('livemoonumber',row[6].value);
           // p_model.set('mariagestatus',row[23].value);

            p_model.save(SQL, function(res) {
              if(res.success) {
                p_model.get(SQL, cid, function(result) {
                  console.log(p_model);
                  callback(true,p_model);
                });
              }
            }); 
            var log_f = function(res) {
              console.log(res);
            };

            p_model.save(SQL, function(res) {
              if(res.success) {
                p_model.get(SQL, cid, function(result) {
                  console.log(p_model);
                  GeneralAttributesModel.push(SQL,cid,
                  'ที่อยู่', row[5].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'วัน เดือน ปีเกิด', row[8].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'อายุ', row[11].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'ประเภทเบี้ยยังชีพผู้สูงอายุ', row[12].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'ประเภทเบี้ยยังชีพพิการ', row[13].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'ประเภทเบี้ยยังชีพเอดส์', row[14].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'ได้รับเบี้ยผู้สูงอายุตั้งแต่', row[15].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'ได้รับเบี้ยผู้พิการตั้งแต่', row[16].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'ประเภท งปม.งบทั่วไป', row[17].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'ประเภท งปม.งบเฉพาะกิจ', row[18].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'จำนวนเงิน', row[19].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'วิธีการรับเงิน(เงินสด)', row[20].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'วิธีการรับเงิน(เงินสด/มอบอำนาจ)', row[21].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'วิธีการรับเงิน(เข้าบัญชี)', row[22].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'วิธีการรับเงิน(เข้าบัญชี/มอบอำนาจ)', row[23].value,log_f);
                  GeneralAttributesModel.push(SQL,cid,
                  'ประเภทความพิการ', row[24].value,log_f);
                    p_model.gen_attr_log = '';
                    p_model.gen_attr_log += 'ที่อยู่ ='+row[5].value+'\n\r';
                    p_model.gen_attr_log += 'วัน เดือน ปีเกิด ='+row[8].value +''+row[9].value+''+row[10].value+'\n\r';
                    p_model.gen_attr_log += 'อายุ ='+row[11].value+'\n\r';
                    p_model.gen_attr_log += 'ประเภทเบี้ยยังชีพผู้สูงอายุ ='+row[12].value+'\n\r';
                    p_model.gen_attr_log += 'ประเภทเบี้ยยังชีพพิการ ='+row[13].value+'\n\r';
                    p_model.gen_attr_log += 'ประเภทเบี้ยยังชีพเอดส์ ='+row[14].value+'\n\r';
                    p_model.gen_attr_log += 'ได้รับเบี้ยผู้สูงอายุตั้งแต่ ='+row[15].value+'\n\r';
                    p_model.gen_attr_log += 'ได้รับเบี้ยผู้พิการตั้งแต่ ='+row[16].value+'\n\r';
                    p_model.gen_attr_log += 'ประเภท งปม.งบทั่วไป ='+row[17].value+'\n\r';
                    p_model.gen_attr_log += 'ประเภท งปม.งบเฉพาะกิจ ='+row[18].value+'\n\r';
                    p_model.gen_attr_log += 'จำนวนเงิน ='+row[19].value+'\n\r';
                    p_model.gen_attr_log += 'วิธีการรับเงิน(เงินสด) ='+row[20].value+'\n\r';
                    p_model.gen_attr_log += 'วิธีการรับเงิน(เงินสด/มอบอำนาจ) ='+row[21].value+'\n\r';
                    p_model.gen_attr_log += 'วิธีการรับเงิน(เข้าบัญชี) ='+row[22].value+'\n\r';
                    p_model.gen_attr_log += 'วิธีการรับเงิน(เข้าบัญชี/มอบอำนาจ) ='+row[23].value+'\n\r';
                    p_model.gen_attr_log += 'ประเภทความพิการ ='+row[24].value+'\n\r';
                    callback(true,p_model);

                  /*
                  GeneralAttributesModel.push(SQL,cid,
                  'ที่อยู่', row[5].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'วัน เดือน ปีเกิด', row[8].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'อายุ', row[11].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'ประเภทเบี้ยยังชีพผู้สูงอายุ', row[12].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'ประเภทเบี้ยยังชีพพิการ', row[13].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'ประเภทเบี้ยยังชีพเอดส์', row[14].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'ได้รับเบี้ยผู้สูงอายุตั้งแต่', row[15].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'ได้รับเบี้ยผู้พิการตั้งแต่', row[16].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'ประเภท งปม.งบทั่วไป', row[17].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'ประเภท งปม.งบเฉพาะกิจ', row[18].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'จำนวนเงิน', row[19].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'วิธีการรับเงิน(เงินสด)', row[20].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'วิธีการรับเงิน(เงินสด/มอบอำนาจ)', row[21].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'วิธีการรับเงิน(เข้าบัญชี)', row[22].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'วิธีการรับเงิน(เข้าบัญชี/มอบอำนาจ)', row[23].value,function(res) {
                  GeneralAttributesModel.push(SQL,cid,
                  'ประเภทความพิการ', row[24].value,function(res) {

                    p_model.gen_attr_log = '';
                    p_model.gen_attr_log += 'ที่อยู่ ='+row[5].value+'\n\r';
                    p_model.gen_attr_log += 'วัน เดือน ปีเกิด ='+row[8].value +''+row[9].value+''+row[10].value+'\n\r';
                    p_model.gen_attr_log += 'อายุ ='+row[11].value+'\n\r';
                    p_model.gen_attr_log += 'ประเภทเบี้ยยังชีพผู้สูงอายุ ='+row[12].value+'\n\r';
                    p_model.gen_attr_log += 'ประเภทเบี้ยยังชีพพิการ ='+row[13].value+'\n\r';
                    p_model.gen_attr_log += 'ประเภทเบี้ยยังชีพเอดส์ ='+row[14].value+'\n\r';
                    p_model.gen_attr_log += 'ได้รับเบี้ยผู้สูงอายุตั้งแต่ ='+row[15].value+'\n\r';
                    p_model.gen_attr_log += 'ได้รับเบี้ยผู้พิการตั้งแต่ ='+row[16].value+'\n\r';
                    p_model.gen_attr_log += 'ประเภท งปม.งบทั่วไป ='+row[17].value+'\n\r';
                    p_model.gen_attr_log += 'ประเภท งปม.งบเฉพาะกิจ ='+row[18].value+'\n\r';
                    p_model.gen_attr_log += 'จำนวนเงิน ='+row[19].value+'\n\r';
                    p_model.gen_attr_log += 'วิธีการรับเงิน(เงินสด) ='+row[20].value+'\n\r';
                    p_model.gen_attr_log += 'วิธีการรับเงิน(เงินสด/มอบอำนาจ) ='+row[21].value+'\n\r';
                    p_model.gen_attr_log += 'วิธีการรับเงิน(เข้าบัญชี) ='+row[22].value+'\n\r';
                    p_model.gen_attr_log += 'วิธีการรับเงิน(เข้าบัญชี/มอบอำนาจ) ='+row[23].value+'\n\r';
                    p_model.gen_attr_log += 'ประเภทความพิการ ='+row[24].value+'\n\r';
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
                  */
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

CSVMapping.map5 = function(config,callback) { 
  //console.log(config.csv.info);
 //console.log(config.csv.list);
 var SQL = config.sql;
  
  TitleModel.list(SQL, function(title_list) {
  ProvinceModel.list(SQL, function(province_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[2].value.replace(/ /g,'');
    if(isValidThaiID(cid)) {
    //if(isValidThaiID(row[2].value)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var province_id = '?';
      var city_id = '?';
      var tumbon_id = '?';
      //console.log(lastname);
      var gender_result = row[6].value;
      if (gender_result == 'ชาย') {
        var gender_id = 'M';  
      } else {
        var gender_id = 'F';  
      } 
      var title_id = '?';
      for(var idx=0;idx<title_list.rows.length;idx++) {
        if(row[3].value == title_list.rows[idx].cols[1].value) {
          title_id = title_list.rows[idx].cols[0].value;
        }
      }
      
      for(var idx=0;idx<province_list.rows.length;idx++) {
        if(row[22].value == province_list.rows[idx].cols[1].value) {
          province_id = province_list.rows[idx].cols[0].value;
          // Tor
          ProvinceModel.get_cities(SQL, province_id, function(cities) {
            for (var idx=0;idx<cities.rows.length;idx++) {
              if (cities.rows[idx].cols[1].value == row[21].value) {
                city_id = cities.rows[idx].cols[0].value; 
                ProvinceModel.get_tumbons(SQL, city_id, function(tumbons) {
                  for (var idx=0;idx<tumbons.rows.length;idx++) {
                    if (tumbons.rows[idx].cols[1].value == row[20].value) {
                      tumbon_id = tumbons.rows[idx].cols[0].value; 
                      console.log(tumbon_id);
                    }
                  }
                  p_model.set('cid',cid);
                  p_model.set('title_id',title_id);
                  p_model.set('gender_id',gender_id);
                  p_model.set('firstname',row[4].value);
                  p_model.set('lastname',row[5].value);
                  p_model.set('liveprovince',province_id);
                  p_model.set('livecity',city_id);
                  p_model.set('livetumbon',tumbon_id);
                  p_model.set('livehousenumber',row[16].value);
                  p_model.set('livemoonumber',row[18].value);
                  p_model.set('liveallery',row[17].value);
                  p_model.set('livepostcode',row[23].value);
                  p_model.set('livevillagename',row[14].value);
                  //p_model.set('daterecord',row[1].value);
                  //p_model.set('livevillagename',livevillagename);
      
                  p_model.save(SQL, function(res) {
                    if(res.success) {
                      p_model.get(SQL, cid, function(result) {
                        //console.log(p_model);
                        callback(true,p_model);
                      });
                    }
                  }); 

                  var log_f = function(res) {
                    console.log(res);
                  };

                  p_model.save(SQL, function(res) {
                    if(res.success) {
                      p_model.get(SQL, cid, function(result) {
                        console.log(p_model);
                        GeneralAttributesModel.push(SQL,cid,
                        'วันที่จดทะเบียน', row[1].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'วันที่จดทะเบียน', row[7].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'วัน เดือน', row[8].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'ปีเกิด', row[9].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'อายุ', row[10].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'ประเภทความพิการ', row[11].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'ระดับ', row[12].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'ลักษณะความพิการ', row[13].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'ชื่อหมู่บ้าน', row[14].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'ลำดับที่', row[15].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'วันที่จดทะเบียน', row[16].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'ผู้ดูแล', row[24].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'บ้านเลขที่ผู้ดูแล', row[26].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'ซอยผู้ดูแล', row[27].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'หมู่ผู้ดูแล', row[28].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'ถนนผู้ดูแล', row[29].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'ตำบลผู้ดูแล', row[30].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'อำเภอผู้ดูแล', row[31].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'จังหวัดผู้ดูแล', row[32].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'รหัสไปรษณีย์ผู้ดูแล', row[33].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'ความสัมพันธ์', row[34].value,log_f);
                        GeneralAttributesModel.push(SQL,cid,
                        'การดำเนินการ', row[35].value,log_f);
                           p_model.gen_attr_log = '';
                           p_model.gen_attr_log += 'วันที่จดทะเบียน ='+row[1].value+'\n\r';
                           p_model.gen_attr_log += 'วันเดือน ='+row[8].value+'\n\r';
                           p_model.gen_attr_log += 'ปีเกิด ='+row[9].value+'\n\r';
                           p_model.gen_attr_log += 'อายุ ='+row[10].value+'\n\r';
                           p_model.gen_attr_log += 'ประเภทความพิการ ='+row[11].value+'\n\r';
                           p_model.gen_attr_log += 'ระดับ ='+row[12].value+'\n\r';
                           p_model.gen_attr_log += 'ลักษณะความพิการ ='+row[13].value+'\n\r';
                           p_model.gen_attr_log += 'ชื่อหมู่บ้าน ='+row[14].value+'\n\r';
                           p_model.gen_attr_log += 'ลำดับที่ ='+row[15].value+'\n\r';
                           p_model.gen_attr_log += 'วันที่จดทะเบียน ='+row[16].value+'\n\r';
                           p_model.gen_attr_log += 'ผู้ดูแล ='+row[24].value+'\n\r';
                           p_model.gen_attr_log += 'บ้านเลขที่ผู้ดูแล ='+row[26].value+'\n\r';
                           p_model.gen_attr_log += 'ซอยผู้ดูแล ='+row[27].value+'\n\r';
                           p_model.gen_attr_log += 'หมู่ผู้ดูแล ='+row[28].value+'\n\r';
                           p_model.gen_attr_log += 'ถนนผู้ดูแล ='+row[29].value+'\n\r';
                           p_model.gen_attr_log += 'ตำบลผู้ดูแล ='+row[30].value+'\n\r';
                           p_model.gen_attr_log += 'อำเภอผู้ดูแล ='+row[31].value+'\n\r';
                           p_model.gen_attr_log += 'จังหวัดผู้ดูแล ='+row[32].value+'\n\r';
                           p_model.gen_attr_log += 'รหัสไปรษณีย์ผู้ดูแล ='+row[33].value+'\n\r';
                           p_model.gen_attr_log += 'ความสัมพันธ์ ='+row[34].value+'\n\r';
                           p_model.gen_attr_log += 'การดำเนินการ ='+row[35].value+'\n\r';
                      });
                    }
                  });
                });
              } 
            }
          });
        }
      }
      
    } else {
      console.log('Invalid CID '+cid);
      //console.log(row);
      callback(false,row);
    }
  });
 });
 });
};


CSVMapping.map6 = function(config,callback) { 
  //console.log(config.csv.info);
 //console.log(config.csv.list);
 var SQL = config.sql;
  
  TitleModel.list(SQL, function(title_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[6].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var gender_result = row[7].value;
      if (gender_result == 'ช') {
        var gender_id = 'M';  
      } else {
        var gender_id = 'F';  
      } 
      var title_id = '?';
      for(var idx=0;idx<title_list.rows.length;idx++) {
        if(row[2].value == title_list.rows[idx].cols[1].value) {
          title_id = title_list.rows[idx].cols[0].value;
        }
      }
      
      p_model.set('cid',cid);
      p_model.set('title_id',title_id);
      p_model.set('gender_id',gender_id);
      p_model.set('firstname',row[3].value);
      p_model.set('lastname',row[4].value);
      p_model.set('liveprovince','58');
      p_model.set('livehousenumber',row[12].value);
      p_model.set('livemoonumber',row[13].value);
      p_model.set('livepostcode',row[17].value);
      
      p_model.save(SQL, function(res) {
        if(res.success) {
          p_model.get(SQL, cid, function(result) {
            //console.log(p_model);
            callback(true,p_model);
          });
        }
      }); 

      var log_f = function(res) {
        console.log(res);
      };

      p_model.save(SQL, function(res) {
        if(res.success) {
          p_model.get(SQL, cid, function(result) {
            console.log(p_model);
            GeneralAttributesModel.push(SQL,cid,
            'student_id', row[2].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'ระดับการศึกษา', row[5].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'วัน เดือน ปีเกิด', row[8].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'อายุ(ปี)', row[9].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'cnt(month)', row[10].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'HOMEID', row[11].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'PSHOMEID', row[18].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'PSHOMENO', row[19].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'PSMOO', row[20].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'pstumbon', row[21].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'psampher', row[22].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'pschangwat', row[23].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'PSPOSTCODE', row[24].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'ผู้ดูแล1', row[25].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'ผู้ดูแล2', row[26].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'ผู้ดูแล3', row[27].value,log_f);

               p_model.gen_attr_log = '';
               p_model.gen_attr_log += 'student_id ='+row[2].value+'\n\r';
               p_model.gen_attr_log += 'ระดับการศึกษา ='+row[5].value+'\n\r';
               p_model.gen_attr_log += 'วัน เดือน ปีเกิด ='+row[8].value+'\n\r';
               p_model.gen_attr_log += 'อายุ(ปี) ='+row[9].value+'\n\r';
               p_model.gen_attr_log += 'cnt(month) ='+row[10].value+'\n\r';
               p_model.gen_attr_log += 'HOMEID ='+row[11].value+'\n\r';
               p_model.gen_attr_log += 'PSHOMEID ='+row[18].value+'\n\r';
               p_model.gen_attr_log += 'PSHOMENO ='+row[19].value+'\n\r';
               p_model.gen_attr_log += 'PSMOO ='+row[20].value+'\n\r';
               p_model.gen_attr_log += 'pstumbon ='+row[21].value+'\n\r';
               p_model.gen_attr_log += 'psampher ='+row[22].value+'\n\r';
               p_model.gen_attr_log += 'pschangwat ='+row[23].value+'\n\r';
               p_model.gen_attr_log += 'PSPOSTCODE ='+row[24].value+'\n\r';
               p_model.gen_attr_log += 'ผู้ดูแล1 ='+row[25].value+'\n\r';
               p_model.gen_attr_log += 'ผู้ดูแล2 ='+row[26].value+'\n\r';
               p_model.gen_attr_log += 'ผู้ดูแล3 ='+row[27].value+'\n\r';


          });
        }
      });
      
    } else {
      console.log('Invalid CID '+cid);
      //console.log(row);
      callback(false,row);
    }
  });
 });
};


CSVMapping.map7 = function(config,callback) { 
  //console.log(config.csv.info);
 //console.log(config.csv.list);
 var SQL = config.sql;
  
  TitleModel.list(SQL, function(title_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[6].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var gender_result = row[7].value;
      if (gender_result == 'ช') {
        var gender_id = 'M';  
      } else {
        var gender_id = 'F';  
      } 
      var title_id = '?';
      for(var idx=0;idx<title_list.rows.length;idx++) {
        if(row[2].value == title_list.rows[idx].cols[1].value) {
          title_id = title_list.rows[idx].cols[0].value;
        }
      }
      
      p_model.set('cid',cid);
      p_model.set('title_id',title_id);
      p_model.set('gender_id',gender_id);
      p_model.set('firstname',row[3].value);
      p_model.set('lastname',row[4].value);
      p_model.set('liveprovince','58');
      
      p_model.save(SQL, function(res) {
        if(res.success) {
          p_model.get(SQL, cid, function(result) {
            //console.log(p_model);
            callback(true,p_model);
          });
        }
      }); 

      var log_f = function(res) {
        console.log(res);
      };

      p_model.save(SQL, function(res) {
        if(res.success) {
          p_model.get(SQL, cid, function(result) {
            console.log(p_model);
            GeneralAttributesModel.push(SQL,cid,
            'student_id', row[1].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'ชั้น', row[5].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'วัน เดือน ปีเกิด', row[8].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'อายุ(ปี)', row[9].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'อายุ(เดือน)', row[10].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'ชื่อบิดา', row[11].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'ชื่อมารดา', row[12].value,log_f);

               p_model.gen_attr_log = '';
               p_model.gen_attr_log += 'student_id ='+row[1].value+'\n\r';
               p_model.gen_attr_log += 'ชั้น ='+row[5].value+'\n\r';
               p_model.gen_attr_log += 'วัน เดือน ปีเกิด ='+row[8].value+'\n\r';
               p_model.gen_attr_log += 'อายุ(ปี) ='+row[9].value+'\n\r';
               p_model.gen_attr_log += 'อายุ(เดือน) ='+row[10].value+'\n\r';
               p_model.gen_attr_log += 'ชื่อบิดา ='+row[11].value+'\n\r';
               p_model.gen_attr_log += 'ชื่อมารดา ='+row[12].value+'\n\r';

          });
        }
      });
      
    } else {
      console.log('Invalid CID '+cid);
      //console.log(row);
      callback(false,row);
    }
  });
 });
};


CSVMapping.map8 = function(config,callback) { 
  //console.log(config.csv.info);
 //console.log(config.csv.list);
 var SQL = config.sql;
  
  angular.forEach(config.csv.list, function(row) {
    var cid=row[2].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var result = row[3].value.split("  ");
      var firstname = result[0];
      var lastname = result[1];
      p_model.set('cid',cid);
      p_model.set('firstname',firstname);
      p_model.set('lastname',lastname);
      p_model.set('livehousenumber',row[20].value);
      p_model.set('livemoonumber',row[21].value);
      
      p_model.save(SQL, function(res) {
        if(res.success) {
          p_model.get(SQL, cid, function(result) {
            //console.log(p_model);
            callback(true,p_model);
          });
        }
      }); 

      var log_f = function(res) {
        console.log(res);
      };

      p_model.save(SQL, function(res) {
        if(res.success) {
          p_model.get(SQL, cid, function(result) {
            console.log(p_model);
            GeneralAttributesModel.push(SQL,cid,
            'HN', row[1].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'อายุ(ปี)', row[4].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'อายุ(เดือน)', row[5].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'BCG', row[6].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'HBV1', row[7].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'HBV2', row[8].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'HBV3', row[9].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'DTP1', row[10].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'DTP2', row[11].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'DTP3', row[12].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'OPV1', row[13].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'OPV2', row[14].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'OPV3', row[15].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'Measle/MMR', row[16].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'DTPHB1', row[17].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'DTPHB2', row[18].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'DTPHB3', row[19].value,log_f);

              p_model.gen_attr_log = '';
              p_model.gen_attr_log += 'HN ='+row[1].value+'\n\r';
              p_model.gen_attr_log += 'อายุ(ปี) ='+row[4].value+'\n\r';
              p_model.gen_attr_log += 'อายุ(เดือน) ='+row[5].value+'\n\r';
              p_model.gen_attr_log += 'BCG ='+row[6].value+'\n\r';
              p_model.gen_attr_log += 'HBV1 ='+row[7].value+'\n\r';
              p_model.gen_attr_log += 'HBV2 ='+row[8].value+'\n\r';
              p_model.gen_attr_log += 'HBV3 ='+row[9].value+'\n\r';
              p_model.gen_attr_log += 'DTP1 ='+row[10].value+'\n\r';
              p_model.gen_attr_log += 'DTP2 ='+row[11].value+'\n\r';
              p_model.gen_attr_log += 'DTP3 ='+row[12].value+'\n\r';
              p_model.gen_attr_log += 'OPV1 ='+row[13].value+'\n\r';
              p_model.gen_attr_log += 'OPV2 ='+row[14].value+'\n\r';
              p_model.gen_attr_log += 'OPV3 ='+row[15].value+'\n\r';
              p_model.gen_attr_log += 'Measle/MMR ='+row[16].value+'\n\r';
              p_model.gen_attr_log += 'DTPHB1 ='+row[17].value+'\n\r';
              p_model.gen_attr_log += 'DTPHB2 ='+row[18].value+'\n\r';
              p_model.gen_attr_log += 'DTPHB3 ='+row[19].value+'\n\r';

          });
        }
      });
      
    } else {
      console.log('Invalid CID '+cid);
      //console.log(row);
      callback(false,row);
    }
  });
};


CSVMapping.map9 = function(config,callback) { 
  //console.log(config.csv.info);
 //console.log(config.csv.list);
 var SQL = config.sql;
  
  angular.forEach(config.csv.list, function(row) {
    var cid=row[2].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var result = row[3].value.split("  ");
      var firstname = result[0];
      var lastname = result[1];
      p_model.set('cid',cid);
      p_model.set('firstname',firstname);
      p_model.set('lastname',lastname);
      p_model.set('livehousenumber',row[13].value);
      p_model.set('livemoonumber',row[14].value);
      
      p_model.save(SQL, function(res) {
        if(res.success) {
          p_model.get(SQL, cid, function(result) {
            //console.log(p_model);
            callback(true,p_model);
          });
        }
      }); 

      var log_f = function(res) {
        console.log(res);
      };

      p_model.save(SQL, function(res) {
        if(res.success) {
          p_model.get(SQL, cid, function(result) {
            console.log(p_model);
            GeneralAttributesModel.push(SQL,cid,
            'HN', row[1].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'DTP4', row[4].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'OPV4', row[5].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'JE1', row[6].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'JE2', row[7].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'JE3', row[8].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'DTP5', row[9].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'OPV5', row[10].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'ปี', row[11].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'เดือน', row[12].value,log_f);

              p_model.gen_attr_log = '';
              p_model.gen_attr_log += 'HN ='+row[1].value+'\n\r';
              p_model.gen_attr_log += 'DTP4 ='+row[4].value+'\n\r';
              p_model.gen_attr_log += 'OPV4 ='+row[5].value+'\n\r';
              p_model.gen_attr_log += 'JE1 ='+row[6].value+'\n\r';
              p_model.gen_attr_log += 'JE2 ='+row[7].value+'\n\r';
              p_model.gen_attr_log += 'JE3 ='+row[8].value+'\n\r';
              p_model.gen_attr_log += 'DTP5 ='+row[9].value+'\n\r';
              p_model.gen_attr_log += 'OPV5 ='+row[10].value+'\n\r';
              p_model.gen_attr_log += 'ปี ='+row[11].value+'\n\r';
              p_model.gen_attr_log += 'เดือน ='+row[12].value+'\n\r';
          });
        }
      });
      
    } else {
      console.log('Invalid CID '+cid);
      //console.log(row);
      callback(false,row);
    }
  });
};


CSVMapping.map10 = function(config,callback) { 
  //console.log(config.csv.info);
 //console.log(config.csv.list);
 var SQL = config.sql;
  
  angular.forEach(config.csv.list, function(row) {
    var cid=row[3].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var result = row[4].value.split("  ");
      var firstname = result[0];
      var lastname = result[1];
      p_model.set('cid',cid);
      p_model.set('firstname',firstname);
      p_model.set('lastname',lastname);
      
      p_model.save(SQL, function(res) {
        if(res.success) {
          p_model.get(SQL, cid, function(result) {
            //console.log(p_model);
            callback(true,p_model);
          });
        }
      }); 

      var log_f = function(res) {
        console.log(res);
      };


      p_model.save(SQL, function(res) {
        if(res.success) {
          p_model.get(SQL, cid, function(result) {
            console.log(p_model);
            GeneralAttributesModel.push(SQL,cid,
            'รหัสหน่วยงาน', row[0].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'HN', row[1].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            'วันที่ให้บริการ', row[2].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            '', row[5].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            '', row[6].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            '', row[7].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            '', row[8].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            '', row[9].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            '', row[10].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            '', row[11].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            '', row[12].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            '', row[13].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            '', row[14].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            '', row[15].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            '', row[16].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            '', row[17].value,log_f);
            GeneralAttributesModel.push(SQL,cid,
            '', row[18].value,log_f);

              p_model.gen_attr_log = '';
              p_model.gen_attr_log += ' ='+row[0].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[1].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[2].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[5].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[6].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[7].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[8].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[9].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[10].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[11].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[12].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[13].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[14].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[15].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[16].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[17].value+'\n\r';
              p_model.gen_attr_log += ' ='+row[18].value+'\n\r';
          });
        }
      });
      
    } else {
      console.log('Invalid CID '+cid);
      //console.log(row);
      callback(false,row);
    }
  });
};


CSVMapping.schema = [
 // {'name':'พม.- สรุปยอดผู้รับเบี้ยพิการ', 'function':CSVMapping.map1},
 // {'name':'กระทรวงสาธารณสุข - กายอุปกรณ์ ศรีสังวาลย์', 'function':CSVMapping.map2 },
  {
   'name':'กระทรวงสาธารณสุข - รพ.สตถ้ำลอด - ข้อมูลผู้ป่วย_รพสต.ถ้ำลอด', 
   'function':CSVMapping.map1,
   'description': 'จะดึงข้อมูลจาก CSV file ใน column ที่ 12 ที่เก็บข้อมูลบัตรประชาชน' + 
      ' กับ Person.CID จากนั้น ดึงข้อมูลจาก Title.TitleID ที่มี Title.Description' +
      ' ตรงกับ Column ที่ 5 ที่เก็บคำนำหน้าชื่อ จากนั้นจะบันทึกในคอลัมน์ Person.Title' +
      ' สำหรับข้อมูลใน colume ที่ 6 ,7,8 และ 22 ที่เก๊บข้อมูล ชื่อ ,นามสกุล,เพศ และศาสนา ' +
      ' จะบันทึกลงในคอลัมน์ Person.FirstName ,Person.LastName Person.Gender ' +
      ' และPerson.Religion'+
      ' '
  },
  {
   'name':'กระทรวงศึกษาธิการ - โรงเรียนราชประชา 44 ปางมะผ้า - สศศ.1', 
   'function':CSVMapping.map2, 
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
   'name':'กระทรวงศึกษาธิการ - ศูนย์การศึกษาพิเศษ - สศศ.1', 
   'function':CSVMapping.map3 
  },
  {
   'name':'กระทรวงพัฒนาสังคมฯ - สรุปยอดผู้รับเบี้ยยังชีพ - สรุปยอดผู้รับเบี้ยพิการ', 
   'function':CSVMapping.map4 
  },
  {
   'name':'กระทรวงพัฒนาสังคมฯ - ทะเบียนคนพิการ จังหวัดแม่ฮ่องสอน - ข้อมูลคนพิการ', 
   'function':CSVMapping.map5 
  },
  {
   'name':'กระทรวงศึกษาธิการ - สนง.เขคพื้นที่การศึกษา- นักเรียนรวม 15 มิ.ย.54', 
   'function':CSVMapping.map6 
  },
  {
   'name':'กระทรวงศึกษาธิการ - สนง.เขคพื้นที่การศึกษา- studentmis5813001_2554-1', 
   'function':CSVMapping.map7 
  },
  {
   'name':'กระทรวงสาธารณสุข - รพ.สตสำโรงใต้- วัคซีน 0-1ปี ', 
   'function':CSVMapping.map8 
  },
  {
   'name':'กระทรวงสาธารณสุข - รพ.สตสำโรงใต้- วัคซีน 4-5ปี ', 
   'function':CSVMapping.map9 
  },
  {
   'name':'กระทรวงสาธารณสุข - รพ.สตถ้ำลอด- งานค่ารักษาเลข678', 
   'function':CSVMapping.map10 
  },
  {
   'name':'กระทรวงสาธารณสุข - กายอุปกรณ์- กายอุปกรณ์ แม่ลาน้อย ', 
   'function':CSVMapping.map11 
  },
  {
   'name':'กระทรวงสาธารณสุข - กายอุปกรณ์- กายอุปกรณ์ ศรีสังวาลย์ ', 
   'function':CSVMapping.map12 
  }
];
