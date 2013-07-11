function CSVMapping() {
};

function md5_test() {
 var v = md5('พงศ์พันธ์ กิจสนาโยธิน');
 console.log('G_'+v);
}

function get_insurance_id(insurancecard_name) {
  var id_1_list = ['บัตรทอง  12-59 ปี นอกเขต',
    'บัตรทอง 12-59 ปีในเขต',
    'บัตรทองมี ท. (ต่างด้าวเขียวขอบแดง)',
    'บัตรทองมี ท. นอกเขต  0-12 ปี',
    'บัตรทองมี ท. นอกเขต อสม.',
    'บัตรทองมี ท. ในเขต (นร.มัธยมต้น)',
    'บัตรทองมี ท. ในเขต ทหารผ่านศึก',
    'บัตรทองมี ท. ในเขต พระ,แม่ชี',
    'บัตรทองมี ท. ในเขต ผู้พิการ',
    'บัตรทองมี ท. ในเขต ผู้มีรายได้น้อย',
    'บัตรทองมี ท. ในเขต อสม.',
    'บัตรทองมี ท. ในเขต ผู้สูงอายุ NoExp',
    'บัตรทองมี ท.ในเขต เด็ก 0-12ปี'];
  var id_2_list = ['บุคคลที่มีปัญหาทางสถานะและสิทธิ  นอกเขต (UC)  ตามมติ ครม. 53',
    'บุคคลที่มีปัญหาทางสถานะและสิทธิ  ในเขต (UC) ตามมติ ครม. 53'];
  var id_3_list = ['เบิกได้ รพ.ตั้งเบิกให้ (ระบบจ่ายตรง)',
    'เบิกหน่วยงานต้นสังกัด/เบิกได้'];
  var id_4_list = ['ประกันสังคมส่งเงินสมทบไม่ครบ'];
  var id_5_list = ['ห้องฉุกเฉิน','คนไทยสิทธิ์ว่าง'];
  var id_6_list = ['ชำระเงินเอง นอกเขต'];
  var id_7_list = ['ต่างด้าว อสม. ใช้บริการได้เฉพาะ รพ.ปางมะผ้า',
    'ต่างด้าวไม่มีสิทธิการรักษาใด (บัตรเขียวขอบแดง)',
    'ต่างด้าวไม่มีสิทธิการรักษาใด (บัตรเขียวขอบแดง)',
    'ต่างด้าวไม่มีสิทธิ์การรักษาใด ๆ (มีเลข 13 หลัก ไม่ใช่สัญชาติไทย)',
    'ต่างด้าวไม่มีสิทธิ์การรักษาใด ๆ (มีเลข 13 หลัก ไม่ใช่สัญชาติไทย)'];

  if(id_1_list.indexOf(insurancecard_name)!=-1) {
    return '0100';
  }
  if(id_2_list.indexOf(insurancecard_name)!=-1) {
    return '8300';
  }
  if(id_3_list.indexOf(insurancecard_name)!=-1) {
    return '1100';
  }
  if(id_4_list.indexOf(insurancecard_name)!=-1) {
    return '4200';
  }
  if(id_5_list.indexOf(insurancecard_name)!=-1) {
    return '9999';
  }
  if(id_6_list.indexOf(insurancecard_name)!=-1) {
    return '9100';
  }
  if(id_7_list.indexOf(insurancecard_name)!=-1) {
    return '8400';
  }
  return undefined;
}

function get_education_id(education_name) {
  var id_1_list = ['ป.1','ป.2','ป.3'];
  var id_2_list = ['ป.4','ป.5','ป.6'];
  var id_3_list = ['ม.1','ม.2','ม.3','มัธยมศึกษาตอนต้น'];
  var id_4_list = ['ม.4','ม.5','ม.6','มัธยมศึกษาตอนปลาย หรือ ปวช.'];
  var id_5_list = ['ระดับปริญญาตรี'];
  var id_6_list = ['ปวส.'];
  var id_7_list = ['ประถมศึกษา'];
  var id_8_list = ['ไม่ได้ศึกษา'];
  var id_9_list = ['อบ.1'];
  var id_10_list = ['เตรียมอนุบาล'];
  if(id_1_list.indexOf(education_name)!=-1) {
    return '04';
  }
  if(id_2_list.indexOf(education_name)!=-1) {
    return '05';
  }
  if(id_3_list.indexOf(education_name)!=-1) {
    return '06';
  }
  if(id_4_list.indexOf(education_name)!=-1) {
    return '07';
  }
  if(id_7_list.indexOf(education_name)!=-1) {
    return '08';
  }
  if(id_6_list.indexOf(education_name)!=-1) {
    return '09';
  }
  if(id_7_list.indexOf(education_name)!=-1) {
    return '10';
  }
  if(id_8_list.indexOf(education_name)!=-1) {
    return '11';
  }
  if(id_9_list.indexOf(education_name)!=-1) {
    return '03';
  }
  if(id_10_list.indexOf(education_name)!=-1) {
    return '02';
  }
  return undefined;
}


function get_welfare_id(welfare_name) {
  var id_1_list = ['เด็กยากจน (มากเป็นพิเศษ)','เด็กยากจน'];
  var id_2_list = ['เด็กในชนกลุ่มน้อย'];
  if(id_1_list.indexOf(welfare_name)!=-1) {
    return '01';
  }
  if(id_2_list.indexOf(welfare_name)!=-1) {
    return '03';
  }
  return undefined;
}

function get_disability_id(disability_name) {
  var id_1_list = ['1','ทางการมองเห็น'];
  var id_2_list = ['2','ทางการได้ยินหรือสื่อความหมาย'];
  var id_3_list = ['4','ทางกายหรือการเคลื่อนไหว'];
  var id_4_list = ['7'];
  var id_5_list = ['3','5','ทางสติปัญญาหรือการเรียนรู้'];
  var id_6_list = ['8'];
  var id_8_list = ['9'];
  if(id_1_list.indexOf(disability_name)!=-1) {
    return '10';
  }
  if(id_2_list.indexOf(disability_name)!=-1) {
    return '20';
  }
  if(id_3_list.indexOf(disability_name)!=-1) {
    return '30';
  }
  if(id_4_list.indexOf(disability_name)!=-1) {
    return '40';
  }
  if(id_5_list.indexOf(disability_name)!=-1) {
    return '50';
  }
  if(id_6_list.indexOf(disability_name)!=-1) {
    return '60';
  }
  if(id_8_list.indexOf(disability_name)!=-1) {
    return '80';
  }
  return undefined;
}


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

// saveFamily(SQL, ['123',`'ph','sk','1'],function 
function saveFamily(SQL,list,callback) {
 var f_model = new FamilyModel();
 f_model.json = {cols:[]};
 var v = md5(list[1]+' '+list[2]+' '+list[0]);
 
 f_model.set('fmembercid','F'+v.substring(0,12));
 f_model.set('cid',list[0]);
 f_model.set('firstname',list[1]);
 f_model.set('lastname',list[2]);
 f_model.set('carerstatus',list[3]);
 f_model.save(SQL,callback);
}


CSVMapping.map1 = function(config, callback) { 
  var SQL = config.sql;
  TitleModel.list(SQL, function(title_list) {
        angular.forEach(config.csv.list, function(row) {
          if(isValidThaiID(row[12].value)) {
            var p_model = new PersonModel();
            p_model.json = {cols:[]};

            var title_id = '?';
            row[24].value = row[24].value.replace(/\s+/,' ');
            var fresult = row[24].value.split(" ");
            var ffirstname = fresult[0];
            var flastname = fresult[1];
            row[25].value = row[25].value.replace(/\s+/,' ');
            var mresult = row[25].value.split(" ");
            var mfirstname = mresult[0];
            var mlastname = mresult[1];
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
            p_model.set('host','06887');
            //p_model.set('dob','10/08/2013');
            p_model.set('dob',row[11].value);
            row.message_list = [];

            p_model.save(SQL, function(res) {
              if(res.success) {
                p_model.get(SQL, row[12].value, function(result) {
                  //console.log(p_model);
                  //row.message_list.push('Save 1 Person '+row[12].value+' '+row[6].value+' '+row[7].value);;
                  var table_str = "Person(ตารางข้อมูลผู้ด้อยโอกาส)"; 
                  var message_str = 'เลขที่บัตรประชาชน: '+row[12].value+' ชื่อ-สกุล: '+row[6].value+' '+row[7].value;
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                  var host_id = '06887';
                  var now = new Date();
                  //var now = '10/07/2013';
                  var t_model = new TempHNModel();
                  t_model.json = {cols:[]};
                  t_model.set('hn',row[2].value);
                  t_model.set('daterecord',now);
                  t_model.set('hostid',host_id);
                  t_model.set('cid',row[12].value);
                  t_model.save(SQL, function(res) {
                    if(res.success) {
                      //row.message_list.push('Save 1 TempHNModel '+row[2].value+' '+host_id+' '+row[12].value);;
                      var table_str = "TempHNModel"; 
                      var message_str = ' HN: '+row[2].value
                        +' Host: '+host_id
                        +' เลขที่บัตรประชาชน: '+row[12].value;
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                      t_model.get(SQL, row[12].value, function(res) {
                        var e_model = new ExistingWelfareModel();
                        e_model.json = {cols:[]};

                        e_model.set('insurancecardid',get_insurance_id(row[14].value));
                        e_model.set('cid',row[12].value);
                        e_model.save(SQL, function(res) {
                          if(res.success) {
                            var table_str = "ExistingWelfare(ตารางข้อมูลสิทธิ์)"; 
                            var message_str = ' รหัสข้อมูลสิทธิ์: '+get_insurance_id(row[14].value) 
                              +' เลขทีบัตรประชาชน: '+row[12].value;
                            row.message_list.push({'table_name':table_str, 'message':message_str});
                            e_model.get(SQL, row[12].value, function(res) {
                              var edu_model = new EducationChildModel();
                              edu_model.json = {cols:[]};
                              edu_model.set('educationstatusid',get_education_id(row[18].value));
                              edu_model.set('cid',row[12].value);
                              edu_model.save(SQL, function(res) {
                                if(res.success) {
                                  var table_str = "EducationChild(ตารางข้อมูลการศึกษา)"; 
                                  var message_str = ' รหัสระดับการศึกษา: '+get_education_id(row[18].value)
                                    +' เลขที่บัตรประชาชน: '+row[12].value;
                                  row.message_list.push({'table_name':table_str, 'message':message_str});
                                  edu_model.get(SQL, row[12].value, function(res) {
                                    var sp_model = new ServiceProvisionModel();
                                    sp_model.json = {cols:[]};
                                    sp_model.set('psnumber','1');
                                    sp_model.set('hostid','6580702');
                                    sp_model.set('cid',row[12].value);
                                    sp_model.set('caseno','1');
                                    sp_model.save(SQL, function(res) {
                                      if(res.success) {
                                        var table_str = "ServiceProvision(ตารางการบริการ)"; 
                                        var message_str = ' Host: '+host_id
                                          +' เลขที่บัตรประชาชน: '+row[12].value;
                                        row.message_list.push({'table_name':table_str, 'message':message_str});
                                        sp_model.get(SQL, row[12].value,function(res) {
                                          //callback(true,t_model);
                                          //callback(true,e_model);
                                          //callback(true,edu_model);
                                          //callback(true,sp_model);
                                        });
                                      }
                                    });
                                  });
                                }
                              });
                            });
                          }
                        });
                      });
                    }
                  });
                });
                
                if (row[24].value.replace(/\s+/,'')){
                  saveFamily(SQL,[row[12].value,ffirstname, flastname,'1'],
                    function(res) {
                      if(res.success) {
                        var table_str = "Family(ตารางผู้ดูแล)"; 
                        var message_str = '(บิดา) '+ ffirstname+ ' '+flastname;
                        row.message_list.push({'table_name':table_str, 'message':message_str});
                      }
                  });
                }
                if (row[25].value.replace(/\s+/,'')){
                  saveFamily(SQL,[row[12].value, mfirstname, mlastname,'2'],
                    function(res) {
                      if(res.success) {
                        var table_str = "Family"; 
                        var message_str = ' (มารดา) '+mfirstname+' '+ mlastname;  
                        row.message_list.push({'table_name':table_str, 'message':message_str});
                      }
                  });
                }
              }
            }); 
            
          } else {
          
            console.log('Invalid CID '+row[12].value);
            callback(false,row);
          }
        });
  });
};


CSVMapping.map2 = function(config,callback) { 
 var SQL = config.sql;
  
  ProvinceModel.list(SQL, function(province_list) {
  angular.forEach(config.csv.list, function(row) {
    if(isValidThaiID(row[2].value)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var province_id = '?';
      var city_id = '?';
      var tumbon_id = '?';
      var host_id = '99999999';
            row[1].value = row[1].value.replace(/\s+/,' ');
            var result = row[1].value.split(" ");
            var firstname = result[0];
            var lastname = result[1];
            row[7].value = row[7].value.replace(/\s+/,' ');
            var fresult = row[7].value.split(" ");
            var ffirstname = fresult[0];
            var flastname = fresult[1];
            row[8].value = row[8].value.replace(/\s+/,' ');
            var mresult = row[8].value.split(" ");
            var mfirstname = mresult[0];
            var mlastname = mresult[1];
            var result_livenumber = row[3].value.split(" ");
            var livehousenumber = result_livenumber[0];
            var r2 = result_livenumber[1];
            var r3 = result_livenumber[2];
            var r4 = result_livenumber[3];
            var tumbon=r4.replace(/ต./g,'');
            var livemoonumber = r2+" "+r3;
      // ตรวจสอบคอลัมน์เด็กด้อยโอกาส และ replace
       
      for(var idx=0;idx<province_list.rows.length;idx++) {
        if(row[5].value == province_list.rows[idx].cols[1].value) {
          province_id = province_list.rows[idx].cols[0].value;
          ProvinceModel.get_cities(SQL, province_id, function(cities) {
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
                  p_model.set('host',host_id);
                  row.message_list = [];
                  //p_model.set('livevillagename',);
      
                  p_model.save(SQL, function(res) {
                    console.log('P_model.save ');
                    //console.log(res);
                    if(res.success) {
                      var table_str = "Person(ตารางข้อมูลผู้ด้อยโอกาส)"; 
                      var message_str = 'เลขที่บัตรประชาชน: '+row[2].value
                        +' ชื่อ-สกุล: '+firstname+' '+lastname;
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                      p_model.get(SQL, row[2].value, function(result) {
                       //console.log(p_model);
                        var edu_model = new EducationChildModel();
                        edu_model.json = {cols:[]};
                        edu_model.set('educationstatusid',get_education_id(row[10].value));
                        edu_model.set('cid',row[2].value);
                        edu_model.save(SQL, function(edu_res) {
                         if(edu_res.success) {
                          var table_str = "EducationChild(ตารางข้อมูลการศึกษา)"; 
                          var message_str = ' รหัสระดับการศึกษา: '+get_education_id(row[10].value);
                             +' เลขที่บัตรประชาชน: '+row[2].value;
                          row.message_list.push({'table_name':table_str, 'message':message_str});
                          edu_model.get(SQL, row[2].value,function(edu_result) {
                            //console.log(res);
                            var w_model = new WelfareVSPersonModel();
                            w_model.json = {cols:[]};
                            w_model.set('welfareid',get_welfare_id(row[13].value));
                            w_model.set('cid',row[2].value);
                            w_model.save(SQL, function(w_res) {
                             if(w_res.success) {
                              var table_str = "WelfareVSPerson(ตารางข้อมูลเด็กด้อยโอกาส)"; 
                              var message_str = ' รหัสเด็กด้อยโอกาส: '+get_welfare_id(row[13].value)
                                +' เลขที่บัตรประชาชน: '+row[2].value;
                              row.message_list.push({'table_name':table_str, 'message':message_str});
                              w_model.get(SQL, row[2].value, function(w_result) {
                                var sp_model = new ServiceProvisionModel();
                                sp_model.json = {cols:[]};
                                sp_model.set('psnumber','1');
                                sp_model.set('hostid','99999999');
                                sp_model.set('cid',row[2].value);
                                sp_model.set('caseno','1');
                                sp_model.save(SQL, function(sp_res) {
                                 if(sp_res.success) {
                                  var table_str = "ServiceProvision(ตารางการบริการ)"; 
                                  var message_str = ' Host: '+host_id
                                    +' เลขที่บัตรประชาชน: '+row[2].value;
                                  row.message_list.push({'table_name':table_str, 'message':message_str});
                                  sp_model.get(SQL, row[2].value,function(sp_result) {
                                  });
                                 }
                                });
                             
                              });
                             }
                            });
                            
                          });
                         }
                        });
                      });

                      if (row[7].value.replace(/\s+/,'')){
                        saveFamily(SQL,[row[2].value,ffirstname, flastname,'1'],
                          function(res) {
                            if(res.success) {
                              var table_str = "Family(ตารางผู้ดูแล)"; 
                              var message_str = '(บิดา) '+ ffirstname+ ' '+flastname;
                              row.message_list.push({'table_name':table_str, 'message':message_str});
                            }
                        });
                      }
                      if (row[8].value.replace(/\s+/,'')){
                        saveFamily(SQL,[row[2].value, mfirstname, mlastname,'2'],
                          function(res) {
                            if(res.success) {
                              var table_str = "Family"; 
                              var message_str = ' (มารดา) '+mfirstname+' '+ mlastname;  
                              row.message_list.push({'table_name':table_str, 'message':message_str});
                            }
                        });
                      }
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
      var host_id = '02010448';
            row[2].value = row[2].value.replace(/\s+/,' ');
            var result = row[2].value.split(" ");
            var firstname = result[0];
            var lastname = result[1];
            row[6].value = row[6].value.replace(/\s+/,' ');
            var fresult = row[6].value.split(" ");
            var ffirstname = fresult[0];
            var flastname = fresult[1];
            row[7].value = row[7].value.replace(/\s+/,' ');
            var mresult = row[7].value.split(" ");
            var mfirstname = mresult[0];
            var mlastname = mresult[1];
      for(var idx=0;idx<province_list.rows.length;idx++) {
        if(row[11].value == province_list.rows[idx].cols[1].value) {
          province_id = province_list.rows[idx].cols[0].value;
          ProvinceModel.get_cities(SQL, province_id, function(cities) {
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
                  p_model.set('cid',cid);
                  p_model.set('firstname',firstname);
                  p_model.set('lastname',lastname);
                  p_model.set('liveprovince',province_id);
                  p_model.set('livecity',city_id);
                  p_model.set('livetumbon',tumbon_id);
                  p_model.set('livehousenumber',livehousenumber);
                  p_model.set('livemoonumber',livemoonumber);
                  p_model.set('livevillagename',livevillagename);
                  p_model.set('host',host_id);
                  p_model.set('dob',row[4].value);
                  row.message_list = [];
      
                  p_model.save(SQL, function(res) {
                    if(res.success) {
                      var table_str = "Person(ตารางข้อมูลผู้ด้อยโอกาส)"; 
                      var message_str = 'เลขที่บัตรประชาชน: '+cid
                        +' ชื่อ-สกุล: '+firstname+' '+lastname;
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                      p_model.get(SQL, cid, function(result) {
                        var d_model = new DisabilityEvaluationModel();
                        d_model.json = {cols:[]};
                        d_model.set('disabilitycode',get_disability_id(row[13].value));
                        d_model.set('cid',cid);
                        d_model.save(SQL, function(res) {
                         if(res.success) {
                          var table_str = "DisabilityEvaluation(ตารางความบกพร่อง)"; 
                          var message_str = ' รหัสความบกพร่อง: '+get_disability_id(row[13].value)
                            +' เลขที่บัตรประชาชน: '+cid;
                          row.message_list.push({'table_name':table_str, 'message':message_str});
                          d_model.get(SQL, cid,function(result) {
                           var sp_model = new ServiceProvisionModel();
                           sp_model.json = {cols:[]};
                           sp_model.set('psnumber','1');
                           sp_model.set('hostid',host_id);
                           sp_model.set('cid',cid);
                           sp_model.set('caseno','1');
                           sp_model.save(SQL, function(res) {
                            if(res.success) {
                             var table_str = "ServiceProvision(ตารางการบริการ)"; 
                             var message_str = ' Host: '+host_id
                               +' เลขที่บัตรประชาชน: '+cid;
                             row.message_list.push({'table_name':table_str, 'message':message_str});
                             sp_model.get(SQL, cid,function(result) {
                             });
                            }
                           });
                          });
                         }
                        });
                      });
                      
                      if (row[6].value.replace(/\s+/,'')){
                        saveFamily(SQL,[row[2].value,ffirstname, flastname,'1'],
                          function(res) {
                            if(res.success) {
                              var table_str = "Family(ตารางผู้ดูแล)"; 
                              var message_str = '(บิดา) '+ ffirstname+ ' '+flastname;
                              row.message_list.push({'table_name':table_str, 'message':message_str});
                            }
                        });
                      }
                      if (row[7].value.replace(/\s+/,'')){
                        saveFamily(SQL,[row[2].value, mfirstname, mlastname,'2'],
                          function(res) {
                            if(res.success) {
                              var table_str = "Family"; 
                              var message_str = ' (มารดา) '+mfirstname+' '+ mlastname;  
                              row.message_list.push({'table_name':table_str, 'message':message_str});
                            }
                        });
                      }
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
  //});
 });
};



CSVMapping.map4 = function(config, callback) { 
  var SQL = config.sql;
  TitleModel.list(SQL, function(title_list) {
        angular.forEach(config.csv.list, function(row) {
          var cid=row[4].value.replace(/-/g,'');
          if(isValidThaiID(cid)) {
            var p_model = new PersonModel();
            p_model.json = {cols:[]};
            var title_id = '?';
            var host_id = '06002051';
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
            p_model.set('host',host_id);
            row.message_list = [];
           // p_model.set('mariagestatus',row[23].value);

            p_model.save(SQL, function(res) {
              if(res.success) {
                var table_str = "Person(ตารางข้อมูลผู้ด้อยโอกาส)"; 
                var message_str = 'เลขที่บัตรประชาชน: '+cid
                  +' ชื่อ-สกุล: '+row[2].value+' '+row[3].value;
                row.message_list.push({'table_name':table_str, 'message':message_str});
                p_model.get(SQL, cid, function(result) {
                  console.log(p_model);
                  var spd_model = new ServiceProvisionDetailModel();
                  spd_model.json = {cols:[]};
                  spd_model.set('psnumber','1');
                  spd_model.set('actcode','ILL101003000000');
                  spd_model.set('cid',cid);
                  spd_model.save(SQL, function(res) {
                    if(res.success) {
                      var table_str = "ServiceProvisionDetail(ตารางข้อมูลเบี้ยยังชีพ)"; 
                      var message_str = 'ACTCode: ILL101003000000'
                        +' รหัสบัตรประชาชน: '+cid;
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                      spd_model.get(SQL, row[2].value, 
                        function(result) {
                          //callback(true,p_model);
                          callback(true,sp_model);
                            //callback(true,d_model);
                         });
                    }
                  });
                });
              }
            }); 
                     
          } else {
            console.log('Invalid CID '+cid);
            callback(false,row);
          }
        });
  });
};

CSVMapping.map5 = function(config,callback) { 
 var SQL = config.sql;
  
  TitleModel.list(SQL, function(title_list) {
  ProvinceModel.list(SQL, function(province_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[2].value.replace(/ /g,'');
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var province_id = '?';
      var city_id = '?';
      var tumbon_id = '?';
      var host_id = '06002051';
      //console.log(lastname);
      row[24].value = row[24].value.replace(/\s+/,' ');
      var fresult = row[24].value.split(" ");
      var ffirstname = fresult[0];
      var flastname = fresult[1];
      row[25].value = row[25].value.replace(/\s+/,' ');
      var mresult = row[25].value.split(" ");
      var mfirstname = mresult[0];
      var mlastname = mresult[1];
            
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
                  p_model.set('host',host_id);
                  //p_model.set('dob',row[8].value+row[9].value);
                  row.message_list = [];
      
                  p_model.save(SQL, function(res) {
                    if(res.success) {
                      var table_str = "Person(ตารางข้อมูลผู้ด้อยโอกาส)"; 
                      var message_str = 'เลขที่บัตรประชาชน: '+cid
                        +' ชื่อ-สกุล: '+row[4].value+' '+row[5].value;
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                      p_model.get(SQL, cid, function(result) {
                        console.log(p_model);
                        var d_model = new DisabilityEvaluationModel();
                        d_model.json = {cols:[]};
                        var now = new Date();
                        d_model.set('disabilitycode',get_disability_id(row[11].value));
                        d_model.set('cid',row[2].value);
                        d_model.set('caseno',1);
                        d_model.set('recorderid',now);
                        d_model.save(SQL, function(res) {
                         if(res.success) {
                          var table_str = "DisabilityEvaluation(ตารางความบกพร่อง)"; 
                          var message_str = ' รหัสความบกพร่อง: '+get_disability_id(row[11].value)
                            +' เลขที่บัตรประชาชน: '+cid;
                          row.message_list.push({'table_name':table_str, 'message':message_str});
                          d_model.get(SQL, row[2].value,function(result) {
                          });
                         }
                        }); 
                      });

                      if (row[24].value.replace(/\s+/,'')){
                        saveFamily(SQL,[row[2].value,ffirstname, flastname,'1'],
                          function(res) {
                            if(res.success) {
                              var table_str = "Family(ตารางผู้ดูแล)"; 
                              var message_str = '(บิดา) '+ ffirstname+ ' '+flastname;
                              row.message_list.push({'table_name':table_str, 'message':message_str});
                            }
                        });
                      }
                      if (row[25].value.replace(/\s+/,'')){
                        saveFamily(SQL,[row[2].value, mfirstname, mlastname,'2'],
                          function(res) {
                            if(res.success) {
                              var table_str = "Family"; 
                              var message_str = ' (มารดา) '+mfirstname+' '+ mlastname;  
                              row.message_list.push({'table_name':table_str, 'message':message_str});
                            }
                        });
                      }
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
 //});
 });
};


CSVMapping.map6 = function(config,callback) { 
 var SQL = config.sql;
  
  TitleModel.list(SQL, function(title_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[6].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      row[25].value = row[25].value.replace(/\s+/,' ');
      var fresult = row[25].value.split(" ");
      var ffirstname = fresult[0];
      var flastname = fresult[1];
      row[26].value = row[26].value.replace(/\s+/,' ');
      var mresult = row[26].value.split(" ");
      var mfirstname = mresult[0];
      var mlastname = mresult[1];
      row[27].value = row[27].value.replace(/\s+/,' ');
      var oresult = row[27].value.split(" ");
      var ofirstname = oresult[0];
      var olastname = oresult[1];

      var gender_result = row[7].value;
      if (gender_result == 'ช') {
        var gender_id = 'M';  
      } else {
        var gender_id = 'F';  
      } 
      var title_id = '?';
      var host_id = '';
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
      p_model.set('host',host_id);
      //p_model.set('studentif',col[1].value);
      row.message_list = [];
      //p_model.set('host',host_id);
      
      p_model.save(SQL, function(res) {
        if(res.success) {
          var table_str = "Person(ตารางข้อมูลผู้ด้อยโอกาส)"; 
          var message_str = 'เลขที่บัตรประชาชน: '+cid
            +' ชื่อ-สกุล: '+row[3].value+' '+row[4].value;
          row.message_list.push({'table_name':table_str, 'message':message_str});
          p_model.get(SQL, cid, function(result) {
            console.log(p_model);
          });
          
          if (row[25].value.replace(/\s+/,'')){
            saveFamily(SQL,[cid,ffirstname, flastname,'1'],
              function(res) {
                if(res.success) {
                  var table_str = "Family(ตารางผู้ดูแล)"; 
                  var message_str = '(บิดา) '+ ffirstname+ ' '+flastname;
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }
          if (row[26].value.replace(/\s+/,'')){
            saveFamily(SQL,[cid,mfirstname, mlastname,'2'],
              function(res) {
                if(res.success) {
                  var table_str = "Family(ตารางผู้ดูแล)"; 
                  var message_str = '(มารดา) '+ ffirstname+ ' '+flastname;
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }
          if (row[27].value.replace(/\s+/,'')){
            saveFamily(SQL,[cid,ofirstname, olastname,'13'],
              function(res) {
                if(res.success) {
                  var table_str = "Family(ตารางผู้ดูแล)"; 
                  var message_str = '(อื่นๆ) '+ ffirstname+ ' '+flastname;
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }
          
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
 var SQL = config.sql;
  
  TitleModel.list(SQL, function(title_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[6].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      row[9].value = row[9].value.replace(/\s+/,' ');
      var fresult = row[9].value.split(" ");
      var ffirstname = fresult[0];
      var flastname = fresult[1];
      row[10].value = row[10].value.replace(/\s+/,' ');
      var mresult = row[10].value.split(" ");
      var mfirstname = mresult[0];
      var mlastname = mresult[1];
      var gender_result = row[7].value;
      if (gender_result == 'ช') {
        var gender_id = 'M';  
      } else {
        var gender_id = 'F';  
      } 
      var title_id = '?';
      var host_id = '999999999';
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
      p_model.set('host',host_id);
      p_model.set('dob',col[8].value);
      //p_model.set('studentif',col[1].value);

      row.message_list = [];

      p_model.save(SQL, function(res) {
        if(res.success) {
          var table_str = "Person(ตารางข้อมูลผู้ด้อยโอกาส)"; 
          var message_str = 'เลขที่บัตรประชาชน: '+cid
            +' ชื่อ-สกุล: '+row[3].value+' '+row[4].value;
          row.message_list.push({'table_name':table_str, 'message':message_str});
          p_model.get(SQL, cid, function(result) {
            console.log(p_model);
            var edu_model = new EducationChildModel();
            edu_model.json = {cols:[]};
            edu_model.set('educationstatusid',get_education_id(row[5].value));
            edu_model.set('cid',cid);
            edu_model.save(SQL, function(res) {
              if(res.success) {
                var table_str = "EducationChild(ตารางข้อมูลการศึกษา)"; 
                var message_str = ' รหัสระดับการศึกษา: '+get_education_id(row[5].value)
                  +' เลขที่บัตรประชาชน: '+row[12].value;
                row.message_list.push({'table_name':table_str, 'message':message_str});
                edu_model.get(SQL, cid ,function(result) {
                  console.log(result);
                  var sp_model = new ServiceProvisionModel();
                  sp_model.json = {cols:[]};
                  sp_model.set('psnumber','1');
                  sp_model.set('hostid',host_id);
                  sp_model.set('cid',cid);
                  sp_model.set('caseno','1');
                  sp_model.set('psdatetime','2');
                  sp_model.save(SQL, function(res) {
                    if(res.success) {
                      var table_str = "ServiceProvision(ตารางการบริการ)"; 
                      var message_str = ' Host: '+host_id
                        +' เลขที่บัตรประชาชน: '+cid;
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                      sp_model.get(SQL, cid,function(result) {
                        callback(true,edu_model);
                        callback(true,t_model);
                        callback(true,sp_model);
                      });
                    }
                  });
                });
              }
            });
          });

          if (row[9].value.replace(/\s+/,'')){
            saveFamily(SQL,[cid,ffirstname, flastname,'1'],
              function(res) {
                if(res.success) {
                  var table_str = "Family(ตารางผู้ดูแล)"; 
                  var message_str = '(บิดา) '+ ffirstname+ ' '+flastname;
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }
          if (row[10].value.replace(/\s+/,'')){
            saveFamily(SQL,[cid,mfirstname, mlastname,'2'],
              function(res) {
                if(res.success) {
                  var table_str = "Family(ตารางผู้ดูแล)"; 
                  var message_str = '(มารดา) '+ ffirstname+ ' '+flastname;
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }
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
 var SQL = config.sql;
  
  angular.forEach(config.csv.list, function(row) {
    var cid=row[2].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      row[3].value = row[3].value.replace(/\s+/,' ');
      var result = row[3].value.split(" ");
      var firstname = result[0];
      var lastname = result[1];
      p_model.set('cid',cid);
      p_model.set('firstname',firstname);
      p_model.set('lastname',lastname);
      p_model.set('livehousenumber',row[20].value);
      p_model.set('livemoonumber',row[21].value);
      row.message_list = [];
      
      p_model.save(SQL, function(res) {
        if(res.success) {
          p_model.get(SQL, cid, function(result) {
            //console.log(p_model);
            callback(true,p_model);
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
 var SQL = config.sql;
  
  angular.forEach(config.csv.list, function(row) {
    var cid=row[2].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};  
      row[3].value = row[3].value.replace(/\s+/,' ');
      var result = row[3].value.split(" ");
      var firstname = result[0];
      var lastname = result[1];
      p_model.set('cid',cid);
      p_model.set('firstname',firstname);
      p_model.set('lastname',lastname);
      p_model.set('livehousenumber',row[13].value);
      p_model.set('livemoonumber',row[14].value);
      row.message_list = [];
      
      p_model.save(SQL, function(res) {
        if(res.success) {
          p_model.get(SQL, cid, function(result) {
            //console.log(p_model);
            callback(true,p_model);
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
 var SQL = config.sql;
  
 DiseaseDataModel.list(SQL,function(dis_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[3].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var host_id = '00978';
      row[4].value = row[4].value.replace(/\s+/,' ');
      var result = row[4].value.split(" ");
      var firstname = result[0];
      var lastname = result[1];
      var discode = '?';
      var discode_result = row[5].value;

      for(var idx=0;idx<dis_list.rows.length;idx++) {
       if(discode_result == dis_list.rows[idx].cols[1].value) {
         discode = dis_list.rows[idx].cols[0].value;
       }
      }

      p_model.set('cid',cid);
      p_model.set('firstname',firstname);
      p_model.set('lastname',lastname);
      p_model.set('host',host_id);
      row.message_list = [];

      p_model.save(SQL, function(res) {
        if(res.success) {
          var table_str = "Person(ตารางข้อมูลผู้ด้อยโอกาส)"; 
          var message_str = 'เลขที่บัตรประชาชน: '+cid
            +' ชื่อ-สกุล: '+firstname+' '+lastname;
          row.message_list.push({'table_name':table_str, 'message':message_str});
          p_model.get(SQL, cid, function(result) {
            console.log(p_model);
            var now = new Date();
            //var now = '10/07/2013';
            var t_model = new TempHNModel();
            t_model.json = {cols:[]};
            t_model.set('hn',row[2].value);
            t_model.set('daterecord',now);
            t_model.set('hostid',host_id);
            t_model.set('cid',cid);
            t_model.save(SQL, function(res) {
             if(res.success) {
              var table_str = "TempHNModel"; 
              var message_str = ' HN: '+row[2].value
               +' Host: '+host_id
               +' เลขที่บัตรประชาชน: '+cid;
              row.message_list.push({'table_name':table_str, 'message':message_str});
              t_model.get(SQL, cid, function(result) {
               var sp_model = new ServiceProvisionModel();
               sp_model.json = {cols:[]};
               sp_model.set('psnumber','1');
               sp_model.set('hostid',host_id);
               sp_model.set('cid',cid);
               sp_model.set('caseno','1');
               sp_model.save(SQL, function(res) {
                if(res.success) {
                 var table_str = "ServiceProvision(ตารางการบริการ)"; 
                 var message_str = ' Host: '+host_id
                   +' เลขที่บัตรประชาชน: '+cid;
                 row.message_list.push({'table_name':table_str, 'message':message_str});
                 sp_model.get(SQL, cid,function(result) {
                   var dis_model = new DiagnosisEvaluationModel();
                   dis_model.json = {cols:[]};
                   dis_model.set('discode',discode);
                   dis_model.set('cid',cid);
                   dis_model.save(SQL, function(res) {
                     if(res.success) {
                       var table_str = "DiagnosisEvaluation"; 
                       var message_str = ' discode: '+discode+' เลขที่บัตรประชาชน: '+cid;
                       row.message_list.push({'table_name':table_str, 'message':message_str});
                       dis_model.get(SQL, cid,function(result) {
                         console.log(result);
                         callback(true,t_model);
                         callback(true,sp_model);
                         callback(true,dis_model);
                       });
                     }
                   });
                 });
                }
               });
              });
             }
            });
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

CSVMapping.map14 = function(config,callback) { 
 var SQL = config.sql;
  ProvinceModel.list(SQL, function(province_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[1].value.replace(/-/g,'');
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var host_id = '6580304';
      var province_id = '?';
      var city_id = '?';
      var tumbon_id = '?';
      row[2].value = row[2].value.replace(/\s+/,' ');
      var result = row[2].value.split(" ");
      var firstname = result[0];
      var lastname = result[1];

      for(var idx=0;idx<province_list.rows.length;idx++) {
        if(row[9].value == province_list.rows[idx].cols[1].value) {
          province_id = province_list.rows[idx].cols[0].value;
          ProvinceModel.get_cities(SQL, province_id, function(cities) {
            for (var idx=0;idx<cities.rows.length;idx++) {
              if (cities.rows[idx].cols[1].value == row[8].value) {
                city_id = cities.rows[idx].cols[0].value; 
                ProvinceModel.get_tumbons(SQL, city_id, function(tumbons) {
                  for (var idx=0;idx<tumbons.rows.length;idx++) {
                    if (tumbons.rows[idx].cols[1].value == row[7]) {
                      tumbon_id = tumbons.rows[idx].cols[0].value; 
                      console.log(tumbon_id);
                    }
                  }

                  p_model.set('cid',cid);
                  p_model.set('firstname',firstname);
                  p_model.set('lastname',lastname);
                  p_model.set('host',host_id);
                  p_model.set('dob',row[3].value);
                  p_model.set('liveprovince',province_id);
                  p_model.set('livecity',city_id);
                  p_model.set('livetumbon',tumbon_id);
                  p_model.set('daterecorde','11/06/2011');
                  row.message_list = [];
                  //p_model.set('livehousenumber',col[5].value);
                  //p_model.set('livemoonumber',col[6].value);
      

                  p_model.save(SQL, function(res) {
                   if(res.success) {
                     var table_str = "Person(ตารางข้อมูลผู้ด้อยโอกาส)"; 
                     var message_str = 'เลขที่บัตรประชาชน: '+cid
                       +' ชื่อ-สกุล: '+firstname+' '+lastname;
                     row.message_list.push({'table_name':table_str, 'message':message_str});
                    p_model.get(SQL, cid, function(result) {
                     console.log(p_model);
                     var sp_model = new ServiceProvisionModel();
                     sp_model.json = {cols:[]};
                     sp_model.set('psnumber','1');
                     sp_model.set('hostid',host_id);
                     sp_model.set('cid',cid);
                     sp_model.set('psdatetime','10/06/2011');
                     sp_model.set('caseno','1');
                     sp_model.save(SQL, function(res) {
                      if(res.success) {
                       var table_str = "ServiceProvision(ตารางการบริการ)"; 
                       var message_str = ' Host: '+host_id
                         +' เลขที่บัตรประชาชน: '+cid;
                       row.message_list.push({'table_name':table_str, 'message':message_str});
                       sp_model.get(SQL, cid,function(result) {
                        var edu_model = new EducationChildModel();
                        edu_model.json = {cols:[]};
                        edu_model.set('educationstatusid',get_education_id(row[4].value));
                        edu_model.set('cid',cid);
                        edu_model.save(SQL, function(res) {
                         if(res.success) {
                          var table_str = "EducationChild(ตารางข้อมูลการศึกษา)"; 
                          var message_str = ' รหัสระดับการศึกษา: '+get_education_id(row[4].value)
                            +' เลขที่บัตรประชาชน: '+cid;
                          row.message_list.push({'table_name':table_str, 'message':message_str});
                          edu_model.get(SQL, cid, function(result) {
                           console.log(result);
                           callback(true,t_model);
                           callback(true,sp_model);
                           callback(true,edu_model);
                          });
                         }
                        });
                       });
                      }
                     });
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


CSVMapping.map15 = function(config,callback) { 
 var SQL = config.sql;
  ProvinceModel.list(SQL, function(province_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[1].value.replace(/-/g,'');
      var p_model = new PersonModel();
      p_model.json = {cols:[]};

      var host_id = '6580702';
      var province_id = '?';
      var city_id = '?';
      var tumbon_id = '?';
      row[1].value = row[1].value.replace(/\s+/,' ');
      var result = row[1].value.split(" ");
      var firstname = result[0];
      var lastname = result[1];
      var v = md5(firstname+' '+lastname);
      row[4].value = row[4].value.replace(/\s+/,' ');
      var r = row[4].value.split(" ");
      var livehousenumber = r[0]; 
      var livemoonumber = r[1]; 
      var tumbon = r[2]; 
      var city = r[3]; 
      var liveprovince_result = 'แม่ฮ่องสอน';

      row[3].value = row[3].value.replace(/\s+/,' ');
      var oresult = row[3].value.split(" ");
      var ofirstname = oresult[0];
      var olastname = oresult[1];

      for(var idx=0;idx<province_list.rows.length;idx++) {
        if(liveprovince_result  == province_list.rows[idx].cols[1].value) {
          province_id = province_list.rows[idx].cols[0].value;
          ProvinceModel.get_cities(SQL, province_id, function(cities) {
            for (var idx=0;idx<cities.rows.length;idx++) {
              if (cities.rows[idx].cols[1].value == city) {
                city_id = cities.rows[idx].cols[0].value; 
                ProvinceModel.get_tumbons(SQL, city_id, function(tumbons) {
                  for (var idx=0;idx<tumbons.rows.length;idx++) {
                    if (tumbons.rows[idx].cols[1].value == tumbon ) {
                      tumbon_id = tumbons.rows[idx].cols[0].value; 
                      console.log(tumbon_id);
                    }
                  }

                  p_model.set('cid','C'+v.substring(0,12));
                  p_model.set('firstname',firstname);
                  p_model.set('lastname',lastname);
                  p_model.set('host',host_id);
                  p_model.set('dob',row[2].value);
                  p_model.set('livehousenumber',livehousenumber);
                  p_model.set('livemoonumber',livemoonumber);
                  p_model.set('liveprovince',province_id);
                  p_model.set('livecity',city_id);
                  p_model.set('livetumbon',tumbon_id);
                  p_model.set('daterecorde','11/06/2011');
                  row.message_list = [];
                  //p_model.set('livehousenumber',col[5].value);
                  //p_model.set('livemoonumber',col[6].value);
      

                  p_model.save(SQL, function(res) {
                   if(res.success) {
                    var table_str = "Person(ตารางข้อมูลผู้ด้อยโอกาส)"; 
                    var message_str = 'เลขที่บัตรประชาชน: '+cid
                       +' ชื่อ-สกุล: '+firstname+' '+lastname;
                    row.message_list.push({'table_name':table_str, 'message':message_str});
                    p_model.get(SQL, cid, function(result) {
                     console.log(p_model);
                     var sp_model = new ServiceProvisionModel();
                     sp_model.json = {cols:[]};
                     sp_model.set('psnumber','1');
                     sp_model.set('hostid',host_id);
                     sp_model.set('cid',cid);
                     sp_model.set('psdatetime','10/06/2011');
                     sp_model.set('caseno','1');
                     sp_model.save(SQL, function(res) {
                      if(res.success) {
                       var table_str = "ServiceProvision(ตารางการบริการ)"; 
                       var message_str = ' Host: '+host_id
                         +' เลขที่บัตรประชาชน: '+cid;
                       row.message_list.push({'table_name':table_str, 'message':message_str});
                       sp_model.get(SQL, cid,function(result) {
                       });
                      }
                     });
                    });

                    if (row[3].value.replace(/\s+/,'')){
                      saveFamily(SQL,[cid,ofirstname, olastname,'1'],
                        function(res) {
                          if(res.success) {
                            var table_str = "Family(ตารางผู้ดูแล)"; 
                            var message_str = '(อื่นๆ) '+ ofirstname+ ' '+olastname;
                            row.message_list.push({'table_name':table_str, 'message':message_str});
                          }
                      });
                    }
                   }
                  });
                });
              }
            }
          });
        }
      } 
      
  });
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
   ' name':'สาธารณสุข_รพ.สตถ้ำลอด_exportข้อมูลตรวจ' , 
   'function':CSVMapping.map11 
  },
  {
   'name':'กระทรวงสาธารณสุข - กายอุปกรณ์- กายอุปกรณ์ แม่ลาน้อย ', 
   'function':CSVMapping.map12 
  },
  {
   'name':'กระทรวงสาธารณสุข - กายอุปกรณ์- กายอุปกรณ์ ศรีสังวาลย์ ', 
   'function':CSVMapping.map13 
  },
  {
   'name':'อบต.แม่นาเติง', 
   'function':CSVMapping.map14 
  },
  {
   'name':'อบต.สบป่อง', 
   'function':CSVMapping.map15 
  }
];
