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
 
 f_model.set('fmembercid','F'+v.substring(0,13));
 f_model.set('cid',list[0]);
 f_model.set('firstname',list[1]);
 f_model.set('lastname',list[2]);
 f_model.set('carerstatus',list[3]);
 f_model.save(SQL,callback);
}


CSVMapping.map1 = function(config, callback) { 
  //console.log(config.csv.info);
  //console.log(config.csv.list);
  var SQL = config.sql;
  TitleModel.list(SQL, function(title_list) {
  EducationLevelCModel.list(SQL, function(level_list) {
  //InsuranceCardModel.list(SQL, function(insurancecard_list) {
 //  GenderModel.list(SQL, function(gender_list) {
        angular.forEach(config.csv.list, function(row) {
          if(isValidThaiID(row[12].value)) {
            var p_model = new PersonModel();
            p_model.json = {cols:[]};

            var title_id = '?';
            var insurancecard_id = '?';
            var education_id = '?';
            var education_result = row[18].value;
            var insurancecard_id_result = row[14].value;
            var fresult = row[24].value.split("  ");
            var ffirstname = fresult[0];
            var flastname = fresult[1];
            var gender_result = row[8].value;
            if (gender_result == 'ชาย') {
              var gender_id = 'M';  
            } else {
              var gender_id = 'F';  
            } 

            if (insurancecard_id_result == 'คนไทยสิทธิ์ว่าง') {
               insurancecard_id = '8300';
            } else {
               if (insurancecard_id_result == 'ชำระเงินเอง นอกเขต') {
                 insurancecard_id = '9100';
               } else {
                 if ( (insurancecard_id_result == 'บัตรทอง  12-59 ปี นอกเขต') || (insurancecard_id_result == 'บัตรทอง 12-59 ปีในเขต' ) || (insurancecard_id_result == 'บัตรทองมี ท. (ต่างด้าวเขียวขอบแดง)' ) || (insurancecard_id_result == 'บัตรทองมี ท. นอกเขต  0-12 ปี' ) || (insurancecard_id_result == 'บัตรทองมี ท. นอกเขต อสม.' ) || (insurancecard_id_result == 'บัตรทองมี ท. ในเขต (นร.มัธยมต้น)' ) || (insurancecard_id_result == 'บัตรทองมี ท. ในเขต ทหารผ่านศึก' ) || (insurancecard_id_result == 'บัตรทองมี ท. ในเขต พระ,แม่ชี') || (insurancecard_id_result == 'บัตรทองมี ท. ในเขต ผู้พิการ' ) || (insurancecard_id_result == 'บัตรทองมี ท. ในเขต ผู้มีรายได้น้อย') || (insurancecard_id_result == 'บัตรทองมี ท. ในเขต อสม.' ) || (insurancecard_id_result == 'บัตรทองมี ท. ในเขต ผู้สูงอายุ NoExp') || (insurancecard_id_result == 'บัตรทองมี ท.ในเขต เด็ก 0-12ปี' ) ) {
                   insurancecard_id = '0100';
                 } else {
                   if ((insurancecard_id_result == 'บุคคลที่มีปัญหาทางสถานะและสิทธิ  นอกเขต (UC)  ตามมติ ครม. 53') || (insurancecard_id_result == 'บุคคลที่มีปัญหาทางสถานะและสิทธิ  ในเขต (UC) ตามมติ ครม. 53' )) {
                     insurancecard_id = '8300';
                   } else {
                     if ((insurancecard_id_result == 'เบิกได้ รพ.ตั้งเบิกให้ (ระบบจ่ายตรง)') ||(insurancecard_id_result == 'เบิกหน่วยงานต้นสังกัด/เบิกได้') ) {
                       insurancecard_id = '1100';
                     } else {
                       if (insurancecard_id_result == 'ประกันสังคมส่งเงินสมทบไม่ครบ') {
                         insurancecard_id = '4200';
                       } else {
                         if (insurancecard_id_result == 'ห้องฉุกเฉิน') {
                           insurancecard_id = '8300';
                         } else {
                           if ((insurancecard_id_result == 'ต่างด้าว อสม. ใช้บริการได้เฉพาะ รพ.ปางมะผ้า') || (insurancecard_id_result == 'ต่างด้าวไม่มีสิทธิการรักษาใด (บัตรเขียวขอบแดง)') || (insurancecard_id_result == 'ต่างด้าวไม่มีสิทธิการรักษาใด (บัตรเขียวขอบแดง)') || (insurancecard_id_result == 'ต่างด้าวไม่มีสิทธิ์การรักษาใด ๆ (มีเลข 13 หลัก ไม่ใช่สัญชาติไทย)') || (insurancecard_id_result == 'ต่างด้าวไม่มีสิทธิ์การรักษาใด ๆ (มีเลข 13 หลัก ไม่ใช่สัญชาติไทย)')) {
                           insurancecard_id = '8400';
                           } else {
                             insurancecard_id = '9999';
                           }
                         }
                       }
                     }
                   }
                 }
               }
            } 
            /*
            for(var idx=0;idx<insurancecard_list.rows.length;idx++) {
              if(row[14].value == insurancecard_list.rows[idx].cols[1].value) {
                insurancecard_id = insurancecard_list.rows[idx].cols[0].value;
              }
            }
            */

            for(var idx=0;idx<title_list.rows.length;idx++) {
              if(row[5].value == title_list.rows[idx].cols[1].value) {
                title_id = title_list.rows[idx].cols[0].value;
              }
            }
            for(var idx=0;idx<level_list.rows.length;idx++) {
              if(row[18].value == level_list.rows[idx].cols[1].value) {
                education_id = level_list.rows[idx].cols[0].value;
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
                  console.log(p_model);
                  row.message_list.push('Save 1 Person '+row[12].value+' '+row[6].value+' '+row[7].value);;
                //  callback(true,p_model);
                });
              }
            }); 

            var log_f = function(res) {
              console.log(res);
            };

            p_model.save(SQL, function(res) {
              if(res.success) {
                p_model.get(SQL, row[12].value, function(result) {
                  console.log(p_model);
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
                      row.message_list.push('Save 1 TempHNModel '+row[2].value+' '+host_id+' '+row[12].value);;
                      t_model.get(SQL, row[12].value, function(result) {
                        var e_model = new ExistingWelfareModel();
                        e_model.json = {cols:[]};
                        e_model.set('insurancecardid',insurancecard_id);
                        e_model.set('cid',row[12].value);
                        e_model.save(SQL, function(res) {
                          if(res.success) {
                            e_model.get(SQL, row[12].value, function(result) {
                              var edu_model = new EducationChildModel();
                              edu_model.json = {cols:[]};
                              edu_model.set('educationstatusid',education_id);
                              edu_model.set('cid',row[12].value);
                              edu_model.save(SQL, function(res) {
                                if(res.success) {
                                  edu_model.get(SQL, row[12].value, function(result) {
                                    var sp_model = new ServiceProvisionModel();
                                    sp_model.json = {cols:[]};
                                    sp_model.set('psnumber','1');
                                    sp_model.set('hostid','6580702');
                                    sp_model.set('cid',row[12].value);
                                    sp_model.set('caseno','1');
                                    sp_model.save(SQL, function(res) {
                                      if(res.success) {
                                       sp_model.get(SQL, row[12].value, 
                                        function(result) {
                                        console.log(result);
                                        saveFamily(SQL,[row[12].value, 
                                         ffirstname, flastname,'1'],
                                          function(res) {
                                           if(res.success) {
                                           saveFamily(SQL,[row[12].value, 
                                           ffirstname, flastname,'2'],
                                           function(res) {
                                           if(res.success) {
                                             callback(true,t_model);
                                             callback(true,e_model);
                                             callback(true,edu_model);
                                             callback(true,sp_model);
                                           }
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
                    }
                  });
                  /*
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
                  */
                });
              }
            }); 
            
          } else {
          
            console.log('Invalid CID '+row[12].value);
            callback(false,row);
          }
        });
   // }); 
  //});
  });
  });
};


CSVMapping.map2 = function(config,callback) { 
 var SQL = config.sql;
  
  ProvinceModel.list(SQL, function(province_list) {
  EducationLevelCModel.list(SQL, function(level_list) {
  WelfareCategoryModel.list(SQL, function(welfare_list) {
  angular.forEach(config.csv.list, function(row) {
    if(isValidThaiID(row[2].value)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var province_id = '?';
      var city_id = '?';
      var tumbon_id = '?';
      var host_id = '99999999';
      var education_id = '?';
      var education_name = '?';
      var education_result = row[10].value;
      var welfare_id = '?';
      var welfare_name = '?';
      var welfare_result = row[13].value;
      console.log(welfare_result);
      
      
      // ตรวจสอบคอลัมน์การศึกษา และ replace
      if ((education_result == 'ป.1') || (education_result == 'ป.2') || (education_result == 'ป.3')) {
        education_name = 'ประถมศึกษาตอนต้น';
      } else {
        if ((education_result == 'ป.4') || (education_result == 'ป.5') || (education_result == 'ป.6')) {
          education_name = 'ประถมศึกษาตอนปลาย';
        } else {
          if ((education_result == 'ม.1') || (education_result == 'ม.2') || (education_result == 'ม.3')) {
          education_name = 'มัธยมศึกษาตอนต้น';
          } else {
            if ((education_result == 'ม.4') || (education_result == 'ม.5') || (education_result == 'ม.6')) {
              education_name = 'มัธยมศึกษาตอนปลาย';
            } else {
              education_name = 'อื่นๆ';
            }
          }
        }
      } 
      // ตรวจสอบคอลัมน์เด็กด้อยโอกาส และ replace
       
      if (welfare_result == 'เด็กยากจน (มากเป็นพิเศษ)') {
        welfare_name = 'เด็กยากจน';
        console.log(welfare_name);
      } else {
        if (welfare_result == 'เด็กยากจน (มากเป็นพิเศษ)') {
          welfare_name = 'เด็กไร้สัญชาติ';
          console.log(welfare_name);
        } else {
          welfare_name = 'อื่นๆ';
          console.log(welfare_name);
        }
      }
       
      for(var idx=0;idx<province_list.rows.length;idx++) {
        if(row[5].value == province_list.rows[idx].cols[1].value) {
          province_id = province_list.rows[idx].cols[0].value;
          ProvinceModel.get_cities(SQL, province_id, function(cities) {
            var result = row[1].value.split("  ");
            var firstname = result[0];
            var lastname = result[1];
            var fresult = row[7].value.split("  ");
            var ffirstname = fresult[0];
            var flastname = fresult[1];
            var mresult = row[8].value.split("  ");
            var mfirstname = mresult[0];
            var mlastname = mresult[1];
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
                  for(var idx=0;idx<level_list.rows.length;idx++) {
                   if(education_name == level_list.rows[idx].cols[1].value) {
                    education_id = level_list.rows[idx].cols[0].value;
                   }
                  }
                  
                  for(var idx=0;idx<welfare_list.rows.length;idx++) {
                   if(welfare_name == welfare_list.rows[idx].cols[1].value) {
                    welfare_id = welfare_list.rows[idx].cols[0].value;
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
                        var edu_model = new EducationChildModel();
                        edu_model.json = {cols:[]};
                        edu_model.set('educationstatusid',education_id);
                        edu_model.set('cid',row[2].value);
                        edu_model.save(SQL, function(res) {
                         if(res.success) {
                          edu_model.get(SQL, row[2].value, 
                           function(result) {
                            console.log(result);
                              
                            var w_model = new WelfareVSPersonModel();
                            w_model.json = {cols:[]};
                            w_model.set('welfareid',welfare_id);
                            w_model.set('cid',row[2].value);
                            w_model.save(SQL, function(res) {
                             if(res.success) {
                              w_model.get(SQL, row[2].value, 
                               function(result) {
                            
                                var sp_model = new ServiceProvisionModel();
                                sp_model.json = {cols:[]};
                                sp_model.set('psnumber','1');
                                sp_model.set('hostid','99999999');
                                sp_model.set('cid',row[2].value);
                                sp_model.set('caseno','1');
                                sp_model.save(SQL, function(res) {
                                 if(res.success) {
                                  sp_model.get(SQL, row[2].value, 
                                   function(result) {
                                    saveFamily(SQL,[row[2].value,
                                     ffirstname, flastname,'1'],
                                      function(res) {
                                       if(res.success) {
                                        saveFamily(SQL,[row[2].value, 
                                         mfirstname, mlastname,'2'],
                                          function(res) {
                                           if(res.success) {
                                             //callback(true,p_model);
                                             callback(true,edu_model);
                                             callback(true,sp_model);
                                             callback(true,w_model);
                                           }
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
                        /*GeneralAttributesModel.push(SQL,row[2].value,
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
                        */
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
 });
 });
};

CSVMapping.map3 = function(config,callback) { 
 var SQL = config.sql;
  
  ProvinceModel.list(SQL, function(province_list) {
  DisabilityTypeModel.list(SQL, function(disabilitytype_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[3].value.replace(/-/g,'');
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var province_id = '?';
      var city_id = '?';
      var tumbon_id = '?';
      var host_id = '02010448';
      for(var idx=0;idx<province_list.rows.length;idx++) {
        if(row[11].value == province_list.rows[idx].cols[1].value) {
          province_id = province_list.rows[idx].cols[0].value;
          ProvinceModel.get_cities(SQL, province_id, function(cities) {
            
            var disability_id = '?';
            var disability_result = row[3].value;
            var disability_name = '?';
            if (disability_result =='1'){
              disability_name = 'ความพิการทางการมองเห็น'; 
            } else {
              if (disability_result =='2'){
                disability_name = 'ความพิการทางการได้ยินและสื่อความหมาย'; 
              } else {
                if ((disability_result =='3') || (disability_result =='5')){
                  disability_name = 'ความพิการทางสติปัญญา หรือ การเรียนรู้'; 
                } else {
                  if (disability_result =='4'){
                    disability_name = 'ความพิการทางการเคลื่อนไหวหรือทางร่างกาย'; 
                  } else {
                    if (disability_result =='6'){
                      disability_name = ''; 
                    } else {
                      if (disability_result =='7'){
                        disability_name = 'ความพิการทางจิตใจหรือพฤติกรรม'; 
                      } else {
                        if (disability_result =='8'){
                          disability_name = 'ออทิสติก'; 
                        } else {
                          disability_name = 'พิการซ้อน'; 
                        }
                      }
                    }
                  }
                }  
              }  
            }  
           
            var result = row[2].value.split("  ");
            var firstname = result[0];
            var lastname = result[1];
            var fresult = row[6].value.split("  ");
            var ffirstname = fresult[0];
            var flastname = fresult[1];
            var mresult = row[7].value.split("  ");
            var mfirstname = mresult[0];
            var mlastname = mresult[1];
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
                  
                  for(var idx=0;idx<disabilitytype_list.rows.length;idx++) {
                   if(disability_result == disabilitytype_list.rows[idx].cols[1].value) {
                    disability_id  = disabilitytype_list.rows[idx].cols[0].value;
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
                        var d_model = new DisabilityEvaluationModel();
                        d_model.json = {cols:[]};
                        d_model.set('disabilitycode',disability_id);
                        d_model.set('cid',cid);
                        d_model.save(SQL, function(res) {
                         if(res.success) {
                          d_model.get(SQL, cid,function(result) {
                           console.log(result);
                           var sp_model = new ServiceProvisionModel();
                           sp_model.json = {cols:[]};
                           sp_model.set('psnumber','1');
                           sp_model.set('hostid',host_id);
                           sp_model.set('cid',cid);
                           sp_model.set('caseno','1');
                           sp_model.save(SQL, function(res) {
                            if(res.success) {
                             sp_model.get(SQL, cid, 
                              function(result) {
                               saveFamily(SQL,[cid,
                                ffirstname, flastname,'1'],
                                 function(res) {
                                  if(res.success) {
                                   saveFamily(SQL,[cid, 
                                    mfirstname, mlastname,'2'],
                                     function(res) {
                                      if(res.success) {
                                       //callback(true,p_model);
                                       callback(true,sp_model);
                                       callback(true,d_model);
                                      }
                                   });
                                  }
                               });
                             });
                            }
                           });
                          });
                         }
                        });
                        /*
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
           // p_model.set('mariagestatus',row[23].value);

            p_model.save(SQL, function(res) {
              if(res.success) {
                p_model.get(SQL, cid, function(result) {
                  console.log(p_model);
                  callback(true,p_model);
                });
              }
            }); 

            p_model.save(SQL, function(res) {
              if(res.success) {
                p_model.get(SQL, cid, function(result) {
                  console.log(p_model);
                  var spd_model = new ServiceProvisionDetailModel();
                  spd_model.json = {cols:[]};
                  spd_model.set('psnumber','1');
                  spd_model.set('actcode','ILL101003000000');
                  spd_model.set('cid',cid);
                  spd_model.save(SQL, function(res) {
                    if(res.success) {
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
            /*var log_f = function(res) {
              console.log(res);
            };
            */
            /*
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
                /*});
              }
            });
            */
                     
          } else {
            console.log('Invalid CID '+cid);
            callback(false,row);
          }
        });
   // }); 
  });
};

CSVMapping.map5 = function(config,callback) { 
 var SQL = config.sql;
  
  TitleModel.list(SQL, function(title_list) {
  DisabilityTypeModel.list(SQL, function(disabilitytype_list) {
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
      var host_id = '06002051';
      //console.log(lastname);
      var fresult = row[24].value.split("  ");
      var ffirstname = fresult[0];
      var flastname = fresult[1];
      var mresult = row[25].value.split("  ");
      var mfirstname = mresult[0];
      var mlastname = mresult[1];
            
      var disability_id = '?';
      var disability_result = row[3].value;
      var disability_name = '?';
      if (disability_result =='ทางการมองเห็น'){
        disability_name = 'ความพิการทางการมองเห็น'; 
      } else {
      if (disability_result =='ทางการได้ยินหรือสื่อความหมาย'){
        disability_name = 'ความพิการทางการได้ยินและสื่อความหมาย'; 
      } else {
      if (disability_result =='ทางสติปัญญาหรือการเรียนรู้') {
        disability_name = 'ความพิการทางสติปัญญา หรือ การเรียนรู้'; 
      } else {
      if (disability_result =='ทางกายหรือการเคลื่อนไหว'){
        disability_name = 'ความพิการทางการเคลื่อนไหวหรือทางร่างกาย'; 
      } else {
        disability_name = '';
      }
      }  
      }  
      }  

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
      
      for(var idx=0;idx<disabilitytype_list.rows.length;idx++) {
        if(disability_result == disabilitytype_list.rows[idx].cols[1].value) {
          disability_id  = disabilitytype_list.rows[idx].cols[0].value;
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
                        var d_model = new DisabilityEvaluationModel();
                        d_model.json = {cols:[]};
                        var now = new Date();
                        d_model.set('disabilitycode',disability_id);
                        d_model.set('cid',row[2].value);
                        d_model.set('caseno',1);
                        d_model.set('recorderid',now);
                        d_model.save(SQL, function(res) {
                         if(res.success) {
                          d_model.get(SQL, row[2].value, 
                           function(result) {
                            console.log(result);
                            saveFamily(SQL,[row[2].value,
                             ffirstname, flastname,'1'],
                              function(res) {
                               if(res.success) {
                                saveFamily(SQL,[row[2].value, 
                                 mfirstname, mlastname,'2'],
                                  function(res) {
                                   if(res.success) {
                                    //callback(true,p_model);
                                    callback(true,d_model);
                                   }
                                });
                               }
                            });
                          });
                         }
                        }); 
                        /*
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
 });
 });
};


CSVMapping.map6 = function(config,callback) { 
  //console.log(config.csv.info);
 //console.log(config.csv.list);
 var SQL = config.sql;
  
  TitleModel.list(SQL, function(title_list) {
  EducationLevelCModel.list(SQL, function(level_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[6].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var gender_result = row[7].value;
      var education_id = '?';
      var education_name = '?';
      var education_result = row[5].value;
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
      
      for(var idx=0;idx<level_list.rows.length;idx++) {
        if(education_name == level_list.rows[idx].cols[1].value) {
          education_id = level_list.rows[idx].cols[0].value;
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
            var edu_model = new EducationChildModel();
            edu_model.json = {cols:[]};
            edu_model.set('educationstatusid',education_id);
            edu_model.set('cid',cid);
            edu_model.save(SQL, function(res) {
              if(res.success) {
                edu_model.get(SQL, cid ,function(result) {
                  console.log(result);
                });
              }
            });
            /*
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

            */
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
 });
};


CSVMapping.map7 = function(config,callback) { 
  //console.log(config.csv.info);
 //console.log(config.csv.list);
 var SQL = config.sql;
  
  TitleModel.list(SQL, function(title_list) {
  EducationLevelCModel.list(SQL, function(level_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[6].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var gender_result = row[7].value;
      var education_id = '?';
      var education_result = row[5].value;
      var education_name = '?';
      if (education_result == 'อบ.1') {
        education_name = 'โรงเรียนอนุบาล';
      } 
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
      
      for(var idx=0;idx<level_list.rows.length;idx++) {
        if(education_name == level_list.rows[idx].cols[1].value) {
          education_id = level_list.rows[idx].cols[0].value;
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

q
        }
      }); 

      var log_f = function(res) {
        console.log(res);
      };

      p_model.save(SQL, function(res) {
        if(res.success) {
          p_model.get(SQL, cid, function(result) {
            console.log(p_model);
            var edu_model = new EducationChildModel();
            edu_model.json = {cols:[]};
            edu_model.set('educationstatusid',education_id);
            edu_model.set('cid',cid);
            edu_model.save(SQL, function(res) {
              if(res.success) {
                edu_model.get(SQL, cid ,function(result) {
                  console.log(result);
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
                      t_model.get(SQL, cid, function(result) {
                        var sp_model = new ServiceProvisionModel();
                        sp_model.json = {cols:[]};
                        sp_model.set('psnumber','1');
                        sp_model.set('hostid',host_id);
                        sp_model.set('cid',cid);
                        sp_model.set('caseno','1');
                        sp_model.set('psdatetime','2');
                        sp_model.save(SQL, function(res) {
                          if(res.success) {
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
              }
            });
            /*
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
            */
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
  
 DiseaseDataModel.list(SQL,function(dis_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[3].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var host_id = '00978';
      var result = row[4].value.split("  ");
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
              t_model.get(SQL, cid, function(result) {
               var sp_model = new ServiceProvisionModel();
               sp_model.json = {cols:[]};
               sp_model.set('psnumber','1');
               sp_model.set('hostid',host_id);
               sp_model.set('cid',cid);
               sp_model.set('caseno','1');
               sp_model.save(SQL, function(res) {
                if(res.success) {
                 sp_model.get(SQL, cid,function(result) {
                   var dis_model = new DiagnosisEvaluationModel();
                   dis_model.json = {cols:[]};
                   dis_model.set('discode',discode);
                   dis_model.set('cid',cid);
                   dis_model.save(SQL, function(res) {
                     if(res.success) {
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
            /*
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
             */
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
  EducationLevelCModel.list(SQL, function(level_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[1].value.replace(/-/g,'');
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var host_id = '6580304';
      var province_id = '?';
      var city_id = '?';
      var tumbon_id = '?';
      var result = row[2].value.split(" ");
      var firstname = result[0];
      var lastname = result[1];
      var education_id = '?';
      var education_result = row[4].value;
      var education_name = '?';
      if (education_result=='เตรียมอนุบาล') {
        education_name = 'ศูนย์เด็กปฐมวัยหรือศูนย์เด็กเล็ก';
      } else {
        education_name = 'อื่นๆ';
      }

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

                  for(var idx=0;idx<level_list.rows.length;idx++) {
                    if(education_name == level_list.rows[idx].cols[1].value) {
                      education_id = level_list.rows[idx].cols[0].value;
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
                  //p_model.set('livehousenumber',col[5].value);
                  //p_model.set('livemoonumber',col[6].value);
      
                  p_model.save(SQL, function(res) {
                   if(res.success) {
                    p_model.get(SQL, cid, function(result) {
                     //console.log(p_model);
                     callback(true,p_model);
                    });
                   }
                  }); 

                  p_model.save(SQL, function(res) {
                   if(res.success) {
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
                       sp_model.get(SQL, cid,function(result) {
                        var edu_model = new EducationChildModel();
                        edu_model.json = {cols:[]};
                        edu_model.set('educationstatusid',education_id);
                        edu_model.set('cid',cid);
                        edu_model.save(SQL, function(res) {
                         if(res.success) {
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
