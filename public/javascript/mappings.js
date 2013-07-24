function CSVMapping() {
};

function md5_test() {
 var v = md5('พงศ์พันธ์ กิจสนาโยธิน');
 console.log('G_'+v);
}

function remove_title(name) {
 var str_order = ['เด็กชาย','เด็กหญิง','นาย','นางสาว','นาง'];
 var dot_name = name.split('.');
 if(dot_name.length > 1) {
  
 } else {
   
 }
  
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
  var id_1_list = ['ป.1','ป.2','ป.3','ป 1','ป. 1'];
  var id_2_list = ['ป.4','ป.5','ป.6'];
  var id_3_list = ['ม.1','ม.2','ม.3','มัธยมศึกษาตอนต้น','มัธยม'];
  var id_4_list = ['ม.4','ม.5','ม.6','มัธยมศึกษาตอนปลาย หรือ ปวช.','อาชีวศึกษา'];
  var id_5_list = ['ระดับปริญญาตรี','อุดมศึกษา','ป ตรี','กำลังศึกษา ปตรี'];
  var id_6_list = ['ปวส.'];
  var id_7_list = ['ประถมศึกษา','ประถม'];
  var id_8_list = ['ไม่ได้ศึกษา'];
  var id_9_list = ['อบ.1','อนุบาล 1','อบ.2','อนุบาล'];
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
  var id_3_list = ['4','ทางกายหรือการเคลื่อนไหว','ทางการเคลื่อนไหวหรือร่างกาย'];
  var id_4_list = ['7','ทางจิต'];
  var id_5_list = ['3','5','ทางสติปัญญาหรือการเรียนรู้','ทางสติปัญญา','ทางการเรียนรู้'];
  var id_6_list = ['8'];
  var id_7_list = ['9'];
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
  if(id_7_list.indexOf(disability_name)!=-1) {
    return '80';
  }
  return undefined;
}

function get_material_id(material_name) {
  var id_1_list = ['8.7.6 ไม้ค้ำยันรักแร้แบบอลูมิเนียม'];
  var id_2_list = ['8.7.7 ไม้เท้าอลูมิเนียมแบบสามขา'];
  var id_3_list = ['8.2.9 เท้าเทียมที่ต้องใส่ร่วมกับขาเทียมแบบต่าง ๆ'];
  var id_4_list = ['8.2.18 เบ้าขาเทียมใต้เข่า'];
  var id_5_list = ['8.2.23 แป้นสายเข็มขัด'];
  var id_6_list = ['8.2.22 สายเข็มขัดเทียม'];
  var id_7_list = ['8.9.2 รถนั่งคนพิการชนิดพับได้ทำด้วยโลหะ'];
  var id_8_list = ['8.1.8 เบ้าแขนเทียมใต้ศอก'];
  var id_9_list = ['วัสดุสิ้นเปลืองในการผลิตกายอุปกรณ์/ซ่อมอุปกรณ์'];
  var id_10_list = ['สายสวนปัสสาวะแบบสวนด้วยตนเอง'];
  if(id_1_list.indexOf(material_name)!=-1) {
    return '990001';
  }
  if(id_2_list.indexOf(material_name)!=-1) {
    return '990002';
  }
  if(id_3_list.indexOf(material_name)!=-1) {
    return '820900';
  }
  if(id_3_list.indexOf(material_name)!=-1) {
    return '820900';
  }
  if(id_4_list.indexOf(material_name)!=-1) {
    return '821800';
  }
  if(id_5_list.indexOf(material_name)!=-1) {
    return '822300';
  }
  if(id_6_list.indexOf(material_name)!=-1) {
    return '822200';
  }
  if(id_7_list.indexOf(material_name)!=-1) {
    return '990003';
  }
  if(id_8_list.indexOf(material_name)!=-1) {
    return '810800';
  }
  if(id_9_list.indexOf(material_name)!=-1) {
    return '990004';
  }
  if(id_10_list.indexOf(material_name)!=-1) {
    return '990005';
  }
  return undefined;
}

function get_occupation_id(occupation_name) {
  var id_1_list = ['ก่อสร้าง','เก็บของเก่า','เก็บของเก่าขาย',
     'ขับมอเตอร์ไซต์รับจ้าง','ขับรถตุ๊กๆ','ขับรถทัวร์','ขับรถรับจ้าง',
     'ขายไส้กรอก','เข็นของ บขส 2','ค้าขาย','ค้าขายอิสระ',
     'หาของเก่า เก็บขยะขาย','ลูกจ้างกรมทางหลวง','ลูกจ้าง',
     'ลิเก','ลงป้าย','รับจ้างทั่วไป','รับจ้าง','รับจ้างเย็บผ้า',
     'รับจ้างก่อสร้าง','รับจ้่าง','ธุรกิจส่วนตัว','ช่าง','ค้าบาย'
    ];
  var id_2_list = ['เกษตรกรรม','เลี้ยงม้า','ทำนา','ทำสวน'];
  var id_3_list = ['ขอทาน','นักบวข','บวชเป็นพระ','เสียชีวิต','เสียชีวิตแล้ว','จ๊อกกี้'];
  var id_4_list = ['ข้าราชการบำนาญ','รับราชการ','รับราชการบำนาญ','ทหาร'];
  var id_5_list = ['ว่างงาน','ไม่มี','แม่บ้าน'];
  var id_6_list = ['รัฐวิสาหกิจ','พนักงานรัฐวิสาหกิจ'];
  var id_7_list = ['รปภ','รักษาความปลอดภัย','ร.ป.ภ','พนักงานโรงงาน',
     'พนักงานบริษัท','พนักงาน'
   ];
  if(id_1_list.indexOf(occupation_name)!=-1) {
    return '3';
    //รับจ้าง / ค้าขาย / ธุรกิจส่วนตัว
  }
  if(id_2_list.indexOf(occupation_name)!=-1) {
    return '2';
    //เกษตรกร (ทำไร่,นา,สวน / เลี้ยงสัตว์ / ประมง)
  }
  if(id_3_list.indexOf(occupation_name)!=-1) {
    return '8';
    //อื่นๆ
  }
  if(id_4_list.indexOf(occupation_name)!=-1) {
    return '4';
    //ข้าราชการ / พนักงานรัฐ
  }
  if(id_5_list.indexOf(occupation_name)!=-1) {
    return '1';
    //ไม่มีอาชีพ / ว่างงาน
  }
  if(id_6_list.indexOf(occupation_name)!=-1) {
    return '5';
    //พนักงานรัฐวิสาหกิจ
  }
}
/*
function isValidThaiID(str) {
 //var pattern = /^(\d{13})?$/;
 //console.log(str);
 //return pattern.test(str);
  return undefined;
}
*/
function isValidThaiID(str) {
 //var pattern = /^(\d{13})?$/;
 //console.log(str);
 //return pattern.test(str);
  
  var pattern = /^(\d{13})?$/;
  m = str.replace(/\s+/g,'');
  //console.log('isValidThaiID '+str+' '+m);
  if(m.length==0) {
    return false;
  }  else {
    //console.log(m+' '+pattern.test(m));
    return pattern.test(m);
  }
  
}

function isReplaceSpace(str) {

  var pattern = /^(\w)?$/;
  m = str.replace(/&nbsp;+/g,'');
  if(m.length==0) {
    return false;
  }  else {
    //console.log(m+' '+pattern.test(m));
    return pattern.test(m);
  }
}

// saveFamily(SQL, ['123',`'ph','sk','1'],function 
function saveFamily(SQL,list,callback) {
 var f_model = new FamilyModel();
 f_model.json = {cols:[]};
 var v = md5(list[1]+' '+list[2]+' '+list[0]);
 console.log(list);
 
                  /*console.log("province-"+province_id);
                  console.log("housenumber-"+row[16].value);
                  console.log("moo-"+row[18].value);
                  console.log("postcode-"+row[23].value);
                  console.log("city-"+city_id);
                  console.log("tumbon-"+tumbon_id);
                  console.log("villagename-"+row[14].value);
                  */
 f_model.set('fmembercid','F'+v.substring(0,12));
 f_model.set('cid',list[0]);
 f_model.set('firstname',list[1]);
 f_model.set('lastname',list[2]);
 f_model.set('carerstatus',list[3]);
 console.log(list[4]);
 f_model.set('liveprovince',list[4]);

 if(list[5]) {
   f_model.set('livehousenumber',list[5].replace(/(&nbsp;)/g,''));
 } else {
   f_model.set('livehousenumber',list[5]);
 }

 if(list[6]) {
   f_model.set('livemoonumber',list[6].replace(/(&nbsp;)/g,''));
 } else {
   f_model.set('livemoonumber',list[6]);
 }

 f_model.set('livepostcode',list[7]);
 f_model.set('livecity',list[8]);
 f_model.set('livetumbon',list[9]);
 f_model.set('livevillagename',list[10]);
 f_model.save(SQL,callback);
}


function saveFamily1(SQL,list,callback) {
 var f_model = new FamilyModel();
 f_model.json = {cols:[]};
 f_model.set('fmembercid',list[4]);
 f_model.set('cid',list[0]);
 f_model.set('firstname',list[1]);
 f_model.set('lastname',list[2]);
 f_model.set('carerstatus',list[3]);
 f_model.set('occupation',list[5]);
 f_model.set('educationlevel',list[6]);
 f_model.save(SQL,callback);
}


function saveDisabilityEvaluation(SQL,list,callback) {
 var d_model = new DisabilityEvaluationModel();
 d_model.json = {cols:[]};
 d_model.set('disabilitycode',list[1]);
 d_model.set('cid',list[0]);
 d_model.set('caseno',list[2]);
 d_model.set('recorderid',list[3]);
 d_model.set('evaldatetime',list[4]);
 d_model.save(SQL,callback);

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
                      var message_str = '(ข้อมูลHN) '+row[2].value+' Host: '+host_id;
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                      t_model.get(SQL, row[12].value, function(res) {
                        var e_model = new ExistingWelfareModel();
                        e_model.json = {cols:[]};
                        e_model.set('insurancecardid',get_insurance_id(row[14].value));
                        e_model.set('cid',row[12].value);
                        e_model.save(SQL, function(res) {
                          if(res.success) {
                            var table_str = "ExistingWelfare(ตารางข้อมูลสิทธิ์)"; 
                            var message_str = '(ข้อมูลสิทธิ์) '+get_insurance_id(row[14].value); 
                            row.message_list.push({'table_name':table_str, 'message':message_str});
                            e_model.get(SQL, row[12].value, function(res) {
                              var edu_model = new EducationChildModel();
                              edu_model.json = {cols:[]};
                              edu_model.set('educationstatusid',get_education_id(row[18].value));
                              edu_model.set('cid',row[12].value);
                              edu_model.save(SQL, function(res) {
                                if(res.success) {
                                  var table_str = "EducationChild(ตารางข้อมูลการศึกษา)"; 
                                  var message_str = '(ข้อมูลระดับการศึกษา) '+get_education_id(row[18].value);
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
                                        var message_str = '(ข้อมูลการบริการ) Host: '+host_id;
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
    row[2].value =  row[2].value.replace(/\s+/g,'');
    console.log("-->");
    console.log(row[2].value);
    //var cid=row[2].value.replace(/-/g,'');
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
      var tumbon='';
            if(result_livenumber[3]) {
              var r4 = result_livenumber[3];
              tumbon=r4.replace(/ต./g,'');
            }
            var livemoonumber = r2+" "+r3;
            row.message_list = [];
            row.message_list.push({'table_name':'Parse', 
               'message':'HouseNumber'+livehousenumber+'Moo '+livemoonumber+' Tumbon '+tumbon});
          
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
                  //p_model.set('livevillagename',);
      
                  p_model.save(SQL, function(res) {
                    console.log('P_model.save ');
                    console.log(res);
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
                          var message_str = '(ข้อมูลระดับการศึกษา) '+get_education_id(row[10].value);
                          row.message_list.push({'table_name':table_str, 'message':message_str});
                          edu_model.get(SQL, row[2].value,function(edu_result) {
                            //console.log(res);
                            var w_model = new WelfareVSPersonModel();
                            w_model.json = {cols:[]};
                            w_model.set('welfareid',get_welfare_id(row[13].value));
                            w_model.set('cid',row[2].value);
                            w_model.save(SQL, function(w_res) {
                             if(w_res.success) {
                              var table_str = "WelfareVSPerson(ตารางข้อมูลประเภทเด็กด้อยโอกาส)"; 
                              var message_str = '(ข้อมูลประเภทเด็กด้อยโอกาส) '+get_welfare_id(row[13].value);
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
                                  var message_str = '(ข้อมูลHost) '+host_id;
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
      //console.log(tumbons);
      var result_livenumber = row[8].value.split(" ");
      var livehousenumber = result_livenumber[0];
      var livemoonumber = result_livenumber[1];
      var livevillagename = result_livenumber[2];
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
                        var sp_model = new ServiceProvisionModel();
                        sp_model.json = {cols:[]};
                        sp_model.set('psnumber','1');
                        sp_model.set('hostid',host_id);
                        sp_model.set('cid',cid);
                        sp_model.set('caseno','1');
                        sp_model.save(SQL, function(res) {
                         if(res.success) {
                          var table_str = "ServiceProvision(ตารางการบริการ)"; 
                          var message_str = '(ข้อมูลHost) '+host_id;
                          row.message_list.push({'table_name':table_str, 'message':message_str});
                          sp_model.get(SQL, cid,function(result) {
                           var d_model = new DisabilityEvaluationModel();
                           d_model.json = {cols:[]};
                           var now = new Date();
                           d_model.set('disabilitycode',get_disability_id(row[13].value));
                           d_model.set('cid',cid);
                           d_model.set('caseno','1');
                           d_model.set('recorderid','1');
                           d_model.set('evaldatetime',now);
                           d_model.save(SQL, function(res) {
                            if(res.success) {
                              var table_str = "DisabilityEvaluation(ตารางประเภทความบกพร่อง)"; 
                              var message_str = '(ข้อมูลประเภทความบกพร่อง) '+get_disability_id(row[13].value);
                              row.message_list.push({'table_name':table_str, 'message':message_str});
                              d_model.get(SQL, cid,function(result) {

                              });
                            }
                           });
                          });
                         }
                        });
                      });
                      
                      if(row[6].value.replace(/\s+/,'').length != 0) {
                        saveFamily(SQL,[cid,ffirstname, flastname,'1'],
                          function(res) {
                            if(res.success) {
                              var table_str = "Family(ตารางผู้ดูแล)"; 
                              var message_str = '(บิดา) '+ ffirstname+ ' '+flastname;
                              row.message_list.push({'table_name':table_str, 'message':message_str});
                            }
                        });
                      }
                      if(row[7].value.replace(/\s+/,'').length != 0) {
                        saveFamily(SQL,[cid, mfirstname, mlastname,'2'],
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
            p_model.set('dob',row[8].value+'/'+row[9].value+'/'+row[10].value);
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
                  var spd_model = new ServiceProvisionDetailModel();
                  spd_model.json = {cols:[]};
                  spd_model.set('psnumber','1');
                  spd_model.set('actcode','ILL101003000000');
                  spd_model.set('cid',cid);
                  spd_model.set('caseno','1');
                  spd_model.save(SQL, function(res) {
                    //console.log(res);
                    if(res.success) {
                      var table_str = "ServiceProvisionDetail(ตารางข้อมูลรายละเอียดการให้บริการ)"; 
                      var message_str = '(ข้อมูลการให้บริการ): ILL101003000000';
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                      spd_model.get(SQL, cid, function(result) {

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
    var cid =  row[2].value.replace(/\s+/g,'');
    //var cid=row[2].value.replace(/ /g,'');
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var province_id = '?';
      var city_id = '?';
      var tumbon_id = '?';
      var host_id = '06002051';
      var day_month = row[8].value.split("/");
      console.log(day_month[1]);
      console.log(day_month[0]);
      var year = parseInt(row[9].value)-543;
      var dob = day_month[0]+'/'+day_month[1]+'/'+year.toString();
      console.log(dob);
      //console.log(lastname);
      /*
      row[24].value = row[24].value.replace(/\s+/,' ');
      var fresult = row[24].value.split(" ");
      var ffirstname = fresult[0];
      var flastname = fresult[1];
      row[25].value = row[25].value.replace(/\s+/,' ');
      var mresult = row[25].value.split(" ");
      var mfirstname = mresult[0];
      var mlastname = mresult[1];
      */
            
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
                  //p_model.set('firstname',row[4].value.replace(/\s+/,''));
                  //p_model.set('lastname',row[5].value.replace(/\s+/,''));
                  p_model.set('firstname',row[4].value.replace(/&nbsp;+/g,''));
                  p_model.set('lastname',row[5].value.replace(/&nbsp;+/g,''));
                  //p_model.set('firstname',isReplaceSpace(row[4].value));
                  //p_model.set('lastname',isReplaceSpace(row[5].value));
                  p_model.set('liveprovince',province_id);
                  p_model.set('livecity',city_id);
                  p_model.set('livetumbon',tumbon_id);
                  p_model.set('livehousenumber',row[16].value);
                  p_model.set('livemoonumber',row[18].value);
                  //p_model.set('liveallery',row[17].value);
                  p_model.set('livepostcode',row[23].value);
                  p_model.set('livevillagename',row[14].value);
                  p_model.set('host',host_id);
                  p_model.set('dob',dob.toString());
                  p_model.set('daterecord',row[1].value);
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
                        d_model.set('cid',cid);
                        d_model.set('caseno','1');
                        d_model.set('recorderid','1');
                        d_model.set('evaldatetime',now);
                        d_model.save(SQL, function(res) {
                         if(res.success) {
                          var table_str = "DisabilityEvaluation(ตารางข้อมูลประเภทความบกพร่อง)"; 
                          var message_str = ' (ข้อมูลประเภทความบกพร่อง) '+get_disability_id(row[11].value);
                          row.message_list.push({'table_name':table_str, 'message':message_str});
                          d_model.get(SQL, cid,function(result) {
                          });
                         }
                        }); 
                      });
/*
                  p_model.set('liveprovince',province_id);
                  p_model.set('livecity',city_id);
                  p_model.set('livetumbon',tumbon_id);
                  p_model.set('livehousenumber',row[16].value);
                  p_model.set('livemoonumber',row[18].value);
                  //p_model.set('liveallery',row[17].value);
                  p_model.set('livepostcode',row[23].value);
                  p_model.set('livevillagename',row[14].value);
*/
                  console.log("province-"+province_id);
                  console.log("housenumber-"+row[16].value);
                  console.log("moo-"+row[18].value);
                  console.log("postcode-"+row[23].value);
                  console.log("city-"+city_id);
                  console.log("tumbon-"+tumbon_id);
                  console.log("villagename-"+row[14].value);
                      if (row[24].value.replace(/\s+/,'').length != 0){
                        saveFamily(SQL,[cid,row[24].value, row[25].value,'1',province_id,row[16].value,row[18].value,row[23].value,city_id,tumbon_id,row[14].value],
                          function(res) {
                            if(res.success) {
                              var table_str = "Family(ตารางผู้ดูแล)"; 
                              var message_str = '(ผู้ดูแล) '+ row[24].value+ ' '+row[25].value;
                              row.message_list.push({'table_name':table_str, 'message':message_str});
                            }
                        });
                      }
                      /*
                      if (row[25].value.replace(/\s+/,'').length != 0){
                        saveFamily(SQL,[cid, mfirstname, mlastname,'2'],
                          function(res) {
                            if(res.success) {
                              var table_str = "Family"; 
                              var message_str = ' (มารดา) '+mfirstname+' '+ mlastname;  
                              row.message_list.push({'table_name':table_str, 'message':message_str});
                            }
                        });
                      }
                      */
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
      var day_month = row[8].value.split("-");
      console.log(day_month[0]);
      console.log(day_month[1]);
      console.log(day_month[2]);
      var year = parseInt(day_month[2])-543;
      var dob = day_month[1]+'/'+day_month[0]+'/'+year.toString();
      console.log(dob);
      /*row[27].value = row[27].value.replace(/\s+/,' ');
      var oresult = row[27].value.split(" ");
      var ofirstname = oresult[0];
      var olastname = oresult[1];
      */

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
      p_model.set('dob',dob);
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
            var edu_model = new EducationChildModel();
            edu_model.json = {cols:[]};
            edu_model.set('educationstatusid',get_education_id(row[5].value));
            edu_model.set('cid',cid);
            edu_model.save(SQL, function(res) {
              if(res.success) {
                var table_str = "EducationChild(ตารางข้อมูลการศึกษา)"; 
                var message_str = ' (ข้อมูลระดับการศึกษา) '+get_education_id(row[5].value);
                row.message_list.push({'table_name':table_str, 'message':message_str});
                edu_model.get(SQL, row[12].value, function(res) {
                  //console.log(p_model);
               });
              }
            });
          });

          if (row[25].value.replace(/\s+/,'').length != 0){
            saveFamily(SQL,[cid,ffirstname, flastname,'1','58',row[19].value,row[20].value,row[24].value],
              function(res) {
                if(res.success) {
                  var table_str = "Family(ตารางผู้ดูแล)"; 
                  var message_str = '(บิดา) '+ ffirstname+ ' '+flastname;
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }
          if (row[26].value.replace(/\s+/,'').length != 0){
            saveFamily(SQL,[cid,mfirstname, mlastname,'2','58',row[19].value,row[20].value,row[24].value],
              function(res) {
                if(res.success) {
                  var table_str = "Family(ตารางผู้ดูแล)"; 
                  var message_str = '(มารดา) '+ ffirstname+ ' '+flastname;
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }
          /*
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
          */
          
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
      row[11].value = row[11].value.replace(/\s+/,' ');
      var fresult = row[11].value.split(" ");
      var ffirstname = fresult[0];
      var flastname = fresult[1];
      row[12].value = row[12].value.replace(/\s+/,' ');
      var mresult = row[12].value.split(" ");
      var mfirstname = mresult[0];
      var mlastname = mresult[1];
      //if(row[10].value.replace(/\s+/,'').length != 0) {
      //var day_result = row[8].value.replace(/-/g,'/')
      //console.log(row[8].value);
      
      if(row[8].value.indexOf('-').length != 0) {
        console.log("1");
        var day_result = row[8].value.replace(/-/g,'/')
        var day_month = day_result.split("/");
        console.log(day_month[0]);
        console.log(day_month[1]);
        console.log(day_month[2]);
        var year = parseInt(day_month[2])-543;
        var dob = day_month[1]+'/'+day_month[0]+'/'+year.toString();
        console.log(dob);
      } else {
        console.log("2");
        var day_month = row[8].value.split("/");
        console.log(day_month[0]);
        console.log(day_month[1]);
        console.log(day_month[2]);
        var year = parseInt(day_month[2])-543;
        var dob = day_month[0]+'/'+day_month[1]+'/'+year.toString();
        console.log(dob);


      }
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
      p_model.set('dob',dob.toString());
      //p_model.set('dob',col[8].value);
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
                var message_str = ' (ข้อมูลระดับการศึกษา) '+get_education_id(row[5].value);
                row.message_list.push({'table_name':table_str, 'message':message_str});
                edu_model.get(SQL, cid ,function(result) {
                  console.log(result);
                  var sp_model = new ServiceProvisionModel();
                  sp_model.json = {cols:[]};
                  sp_model.set('psnumber','1');
                  sp_model.set('hostid',host_id);
                  sp_model.set('cid',cid);
                  sp_model.set('caseno','1');
                  sp_model.save(SQL, function(res) {
                    if(res.success) {
                      var table_str = "ServiceProvision(ตารางการบริการ)"; 
                      var message_str = ' (ข้อมูลHost) '+host_id;
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                      sp_model.get(SQL, cid,function(result) {

                      });
                    }
                  });
                });
              }
            });
          });

          if(row[9].value.replace(/\s+/,'').length != 0) {
            saveFamily(SQL,[cid,ffirstname, flastname,'1'],
              function(res) {
                if(res.success) {
                  var table_str = "Family(ตารางผู้ดูแล)"; 
                  var message_str = '(บิดา) '+ ffirstname+ ' '+flastname;
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }
          if(row[10].value.replace(/\s+/,'').length != 0) {
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


CSVMapping.map18 = function(config,callback) { 
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


CSVMapping.map19 = function(config,callback) { 
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


CSVMapping.map8 = function(config,callback) { 
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
       var found_dis = false;
       if(discode_result == dis_list.rows[idx].cols[1].value) {
         discode = dis_list.rows[idx].cols[0].value;
         found_dis = true;
       }
      }

      p_model.set('cid',cid);
      p_model.set('firstname',firstname);
      p_model.set('lastname',lastname);
      p_model.set('host',host_id);
      row.message_list = [];

      var log_f = function(res) {
        console.log(res);
      };

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
            t_model.set('hn',row[1].value);
            t_model.set('daterecord',now);
            t_model.set('hostid',host_id);
            t_model.set('cid',cid);
            t_model.save(SQL, function(res) {
             if(res.success) {
              var table_str = "TempHNModel"; 
              var message_str = ' (ข้อมูลHN) '+row[1].value+' Host: '+host_id;
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
                 var message_str = ' (ข้อมูลการบริการ) Host '+host_id;
                 row.message_list.push({'table_name':table_str, 'message':message_str});
                 sp_model.get(SQL, cid,function(result) {
                   
                  if(found_dis) {
                   console.log('Found Discode '+discode);
                   var dis_model = new DiagnosisEvaluationModel();
                   dis_model.json = {cols:[]};
                   dis_model.set('discode',discode);
                   dis_model.set('cid',cid);
                   dis_model.save(SQL, function(res) {
                     if(res.success) {
                       var table_str = "DiagnosisEvaluation"; 
                       var message_str = ' DisCode: '+discode;
                       row.message_list.push({'table_name':table_str, 'message':message_str});
                       dis_model.get(SQL, cid,function(result) {
                         console.log(result);
                       });
                     }
                   });
                  }else{
                    console.log('Not found '+ discode_result + ' CID('+cid+')');
                    GeneralAttributesModel.push(SQL,cid,
                         'ICD10', row[5].value,log_f);
                    var table_str = "GeneralAttributes"; 
                    var message_str = ' ชื่อคอลัมน์:ICD10 value:'+row[5].value;
                    row.message_list.push({'table_name':table_str, 'message':message_str});
                    
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
      
    } else {
      console.log('Invalid CID '+cid);
      //console.log(row);
      callback(false,row);
    }
  });
 });
};

//กายอุปกรณ์ศรีสังวาลย์
CSVMapping.map10 = function(config,callback) { 
  var SQL = config.sql;
  MaterialModel.list(SQL, function(material_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[12].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var result = row[6].value.split(" ");
      var firstname = result[0];
      var lastname = result[1];
      var d_result = row[25].value.split(" ");
      var d_disburse = d_result[0];
      var dr_result = row[26].value.split(" ");
      var d_record = dr_result[0];
      var host_id = '10719';
      var actcode_id = '?';
      var material_result = get_material_id(row[22].value);
      var found_actcode = false; 
      for(var idx=0;idx<material_list.rows.length;idx++) {
        if(material_result == material_list.rows[idx].cols[0].value) {
          actcode_id = material_list.rows[idx].cols[5].value;
          found_actcode = true;
        }
      }
      
      p_model.set('cid',cid);
      p_model.set('firstname',firstname);
      p_model.set('lastname',lastname);
      p_model.set('liveprovince','56');
      row.message_list = [];

      p_model.save(SQL, function(res) {
        console.log('saved '+cid);
        console.log(res);
        if(res.success) {
          var table_str = "Person(ตารางข้อมูลผู้ด้อยโอกาส)"; 
          var message_str = '(ข้อมูลเด็กด้อยโอกาส) '+cid
            +' ชื่อ-สกุล: '+firstname+' '+lastname;
          row.message_list.push({'table_name':table_str, 'message':message_str});
          p_model.get(SQL, cid, function(result) {
            console.log('Get pmodel');
            console.log(result);
            var now = new Date();
            var t_model = new TempHNModel();
            t_model.json = {cols:[]};
            t_model.set('hn',row[9].value);
            t_model.set('daterecord',now);
            t_model.set('hostid',host_id);
            t_model.set('cid',cid);
            t_model.save(SQL, function(res) {
              if(res.success) {
                var table_str = "TempHNModel"; 
                var message_str = ' (ข้อมูลHN) '+row[9].value+' Host: '+host_id;
                row.message_list.push({'table_name':table_str, 'message':message_str});
                t_model.get(SQL, cid, function(result) {
                  var e_model = new ExistingWelfareModel();
                  e_model.json = {cols:[]};
                  e_model.set('insurancecardid','0100');
                  e_model.set('cid',cid);
                  e_model.save(SQL, function(res) {
                    if(res.success) {
                      var table_str = "ExistingWelfare(ตารางข้อมูลสิทธิ์)"; 
                      var message_str = ' (ข้อมูลสิทธิ์) 0100'; 
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                      e_model.get(SQL, cid, function(result) {
                       if(found_actcode) {
                        console.log('Found Material '+material_result+' '+actcode_id +' CID('+cid+') ');
                        var disburse_model = new Temp_disburseModel();
                        disburse_model.json = {cols:[]};
                        console.log(get_material_id(row[22].value));
                        console.log(row[22].value);
                        console.log(get_material_id(row[22].value));
                        disburse_model.set('cid',cid);
                        disburse_model.set('materialcode',get_material_id(row[22].value));
                        disburse_model.set('number',row[23].value);
                        disburse_model.set('money',row[24].value);
                        disburse_model.set('d_disburse',d_disburse);
                        disburse_model.set('d_record',d_record);
                        disburse_model.save(SQL, function(res) {
                          if(res.success) {
                            var table_str = "Temp_disburse(ตารางข้อมูลสิทธิ์)";
                            var message_str = ' (ข้อมูลการเบิกอุปกรณ์) '+get_material_id(row[22].value)
                              +' '+row[23].value +' '+row[24].value;
                            row.message_list.push({'table_name':table_str, 'message':message_str});
                            disburse_model.get(SQL, cid, function(result) {
                              var spd_model = new ServiceProvisionDetailModel();
                              spd_model.json = {cols:[]};
                              spd_model.set('psnumber','1');
                              spd_model.set('actcode',actcode_id);
                              spd_model.set('cid',cid);
                              spd_model.set('caseno','1');
                              spd_model.save(SQL, function(res) {
                                if(res.success) {
                                  var table_str = "ServiceProvisionDetail(ตารางข้อมูลกิจกรรม)"; 
                                  var message_str = '(ข้อมูลกิจกรรม)'+actcode_id;
                                  row.message_list.push({'table_name':table_str, 'message':message_str});
                                  spd_model.get(SQL, cid, 
                                    function(result) {

                                  });
                                }
                              });
                            });
                          }
                        });
                       } else {
                         console.log('Not found '+ material_result + ' CID('+cid+')');
                       } 
                      });
                    }
                  });
                });
              }
            });
            
          });

          if (row[13].value.replace(/\s+/,'').length != 0){
            var now = new Date();
            var param = 'ทางการมองเห็น';
            saveDisabilityEvaluation(SQL,[cid,get_disability_id(param),'1','1',now],
              function(res) {
                if(res.success) {
                  var table_str = "DisabilityEvaluation(ตารางประเภทความบกพร่อง)"; 
                  var message_str = '(ข้อมูลประเภทความบกพร่อง) '
                    +get_disability_id(param);
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }

          if (row[14].value.replace(/\s+/,'').length != 0){
            var now = new Date();
            var param = 'ทางการได้ยินหรือสื่อความหมาย';
            saveDisabilityEvaluation(SQL,[cid,get_disability_id(param),'1','1',now],
              function(res) {
                if(res.success) {
                  var table_str = "DisabilityEvaluation(ตารางประเภทความบกพร่อง)"; 
                  var message_str = '(ข้อมูลประเภทความบกพร่อง) '
                    +get_disability_id(param);
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }

          if (row[15].value.replace(/\s+/,'').length != 0){
            var now = new Date();
            var param = 'ทางการเคลื่อนไหวหรือร่างกาย';
            saveDisabilityEvaluation(SQL,[cid,get_disability_id(param),'1','1',now],
              function(res) {
                if(res.success) {
                  var table_str = "DisabilityEvaluation(ตารางประเภทความบกพร่อง)"; 
                  var message_str = '(ข้อมูลประเภทความบกพร่อง) '
                    +get_disability_id(param);
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }

          if (row[16].value.replace(/\s+/,'').length != 0){
            var now = new Date();
            var param = 'ทางจิต';
            saveDisabilityEvaluation(SQL,[cid,get_disability_id(param),'1','1',now],
              function(res) {
                if(res.success) {
                  var table_str = "DisabilityEvaluation(ตารางประเภทความบกพร่อง)"; 
                  var message_str = '(ข้อมูลประเภทความบกพร่อง) '
                    +get_disability_id(param);
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }

          if (row[17].value.replace(/\s+/,'').length != 0){
            var now = new Date();
            var param = 'ทางสติปัญญา';
            saveDisabilityEvaluation(SQL,[cid,get_disability_id(param),'1','1',now],
              function(res) {
                if(res.success) {
                  var table_str = "DisabilityEvaluation(ตารางประเภทความบกพร่อง)"; 
                  var message_str = '(ข้อมูลประเภทความบกพร่อง) '
                    +get_disability_id(param);
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }

          if (row[18].value.replace(/\s+/,'').length != 0){
            var now = new Date();
            var param = 'ทางการเรียนรู้';
            saveDisabilityEvaluation(SQL,[cid,get_disability_id(param),'1','1',now],
              function(res) {
                if(res.success) {
                  var table_str = "DisabilityEvaluation(ตารางประเภทความบกพร่อง)"; 
                  var message_str = '(ข้อมูลประเภทความบกพร่อง) '
                    +get_disability_id(param);
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
}

//กายอุปกรณ์แม่ลาน้อย
CSVMapping.map9 = function(config,callback) { 
  var SQL = config.sql;
  MaterialModel.list(SQL, function(material_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[13].value;
    if(isValidThaiID(cid)) {
      var p_model = new PersonModel();
      p_model.json = {cols:[]};
      var result = row[7].value.split(" ");
      var firstname = result[0];
      var lastname = result[1];
      var d_result = row[26].value.split(" ");
      //console.log(d_result);
      var d_disburse = d_result[0];
      d_disburse = d_result[0];
      //console.log(d_disburse);
      var dr_result = row[27].value.split(" ");
      var d_record = dr_result[0];
      var host_id = '11205';
      var actcode_id = '?';
      var material_result = get_material_id(row[23].value);
      
      var found_actcode = false;
      for(var idx=0;idx<material_list.rows.length;idx++) {
        if(material_result == material_list.rows[idx].cols[0].value) {
          actcode_id = material_list.rows[idx].cols[5].value;
          found_actcode = true;
        }
      }
      
      p_model.set('cid',cid);
      p_model.set('firstname',firstname);
      p_model.set('lastname',lastname);
      p_model.set('liveprovince','56');
      row.message_list = [];

      p_model.save(SQL, function(res) {
        console.log('saved '+cid);
        console.log(res);
        if(res.success) {
          var table_str = "Person(ตารางข้อมูลผู้ด้อยโอกาส)"; 
          var message_str = '(ข้อมูลเด็กด้อยโอกาส) '+cid
            +' ชื่อ-สกุล: '+firstname+' '+lastname;
          row.message_list.push({'table_name':table_str, 'message':message_str});
          p_model.get(SQL, cid, function(result) {
            console.log('Get pmodel');
            console.log(result);
            var now = new Date();
            var t_model = new TempHNModel();
            t_model.json = {cols:[]};
            t_model.set('hn',row[10].value);
            t_model.set('daterecord',now);
            t_model.set('hostid',host_id);
            t_model.set('cid',cid);
            t_model.save(SQL, function(res) {
              if(res.success) {
                var table_str = "TempHNModel"; 
                var message_str = ' (ข้อมูลHN) '+row[10].value+' Host: '+host_id;
                row.message_list.push({'table_name':table_str, 'message':message_str});
                t_model.get(SQL, cid, function(result) {
                  var e_model = new ExistingWelfareModel();
                  e_model.json = {cols:[]};
                  e_model.set('insurancecardid','0100');
                  e_model.set('cid',cid);
                  e_model.save(SQL, function(res) {
                    if(res.success) {
                      var table_str = "ExistingWelfare(ตารางข้อมูลสิทธิ์)"; 
                      var message_str = ' (ข้อมูลสิทธิ์) 0100'; 
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                      e_model.get(SQL, cid, function(result) {
                       
                        var disburse_model = new Temp_disburseModel();
                        disburse_model.json = {cols:[]};
                        disburse_model.set('cid',cid);
                        disburse_model.set('materialcode',get_material_id(row[23].value));
                        disburse_model.set('number',row[24].value);
                        disburse_model.set('money',row[25].value);
                        disburse_model.set('d_disburse',d_disburse);
                        disburse_model.set('d_record',d_record);
                        disburse_model.save(SQL, function(res) {
                          if(res.success) {
                            var table_str = "Temp_disburse(ตารางข้อมูลการเบิกอุปกรณ์)";
                            var message_str = ' (ข้อมูลการเบิกอุปกรณ์) '+get_material_id(row[23].value)
                              +' จำนวน: '+row[24].value +' ราคา:'+row[25].value;
                            row.message_list.push({'table_name':table_str, 'message':message_str});
                            disburse_model.get(SQL, cid, function(result) {
                             if(found_actcode) {
                              console.log('Found Material '+material_result+' '+actcode_id +' CID('+cid+') ');
                              var spd_model = new ServiceProvisionDetailModel();
                              spd_model.json = {cols:[]};
                              spd_model.set('psnumber','1');
                              spd_model.set('actcode',actcode_id);
                              spd_model.set('cid',cid);
                              spd_model.set('caseno','1');
                              spd_model.save(SQL, function(res) {
                                if(res.success) {
                                  var table_str = "ServiceProvisionDetail(ตารางข้อมูลกิจกรรม)"; 
                                  var message_str = '(ข้อมูลกิจกรรม)'+actcode_id;
                                  row.message_list.push({'table_name':table_str, 'message':message_str});
                                  spd_model.get(SQL, cid, 
                                    function(result) {

                                  });
                                }
                              });
                             }else{
                               console.log('Not found '+ material_result + ' CID('+cid+')');
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

          if (row[14].value.replace(/\s+/,'').length != 0){
            var now = new Date();
            var param = 'ทางการมองเห็น';
            saveDisabilityEvaluation(SQL,[cid,get_disability_id(param),'1','1',now],
              function(res) {
                if(res.success) {
                  var table_str = "DisabilityEvaluation(ตารางประเภทความบกพร่อง)"; 
                  var message_str = '(ข้อมูลประเภทความบกพร่อง) '
                    +get_disability_id(param);
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }

          if (row[15].value.replace(/\s+/,'').length != 0){
            var now = new Date();
            var param = 'ทางการได้ยินหรือสื่อความหมาย';
            saveDisabilityEvaluation(SQL,[cid,get_disability_id(param),'1','1',now],
              function(res) {
                if(res.success) {
                  var table_str = "DisabilityEvaluation(ตารางประเภทความบกพร่อง)"; 
                  var message_str = '(ข้อมูลประเภทความบกพร่อง) '
                    +get_disability_id(param);
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }

          if (row[16].value.replace(/\s+/,'').length != 0){
            var now = new Date();
            var param = 'ทางการเคลื่อนไหวหรือร่างกาย';
            saveDisabilityEvaluation(SQL,[cid,get_disability_id(param),'1','1',now],
              function(res) {
                if(res.success) {
                  var table_str = "DisabilityEvaluation(ตารางประเภทความบกพร่อง)"; 
                  var message_str = '(ข้อมูลประเภทความบกพร่อง) '
                    +get_disability_id(param);
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }

          if (row[17].value.replace(/\s+/,'').length != 0){
            var now = new Date();
            var param = 'ทางจิต';
            saveDisabilityEvaluation(SQL,[cid,get_disability_id(param),'1','1',now],
              function(res) {
                if(res.success) {
                  var table_str = "DisabilityEvaluation(ตารางประเภทความบกพร่อง)"; 
                  var message_str = '(ข้อมูลประเภทความบกพร่อง) '
                    +get_disability_id(param);
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }

          if (row[18].value.replace(/\s+/,'').length != 0){
            var now = new Date();
            var param = 'ทางสติปัญญา';
            saveDisabilityEvaluation(SQL,[cid,get_disability_id(param),'1','1',now],
              function(res) {
                if(res.success) {
                  var table_str = "DisabilityEvaluation(ตารางประเภทความบกพร่อง)"; 
                  var message_str = '(ข้อมูลประเภทความบกพร่อง) '
                    +get_disability_id(param);
                  row.message_list.push({'table_name':table_str, 'message':message_str});
                }
            });
          }

          if (row[19].value.replace(/\s+/,'').length != 0){
            var now = new Date();
            var param = 'ทางการเรียนรู้';
            saveDisabilityEvaluation(SQL,[cid,get_disability_id(param),'1','1',now],
              function(res) {
                if(res.success) {
                  var table_str = "DisabilityEvaluation(ตารางประเภทความบกพร่อง)"; 
                  var message_str = '(ข้อมูลประเภทความบกพร่อง) '
                    +get_disability_id(param);
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
}

//อบต.แม่นาเติง
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
                       var message_str = ' (ข้อมูลการบริการ) Host: '+host_id;
                       row.message_list.push({'table_name':table_str, 'message':message_str});
                       sp_model.get(SQL, cid,function(result) {
                        var edu_model = new EducationChildModel();
                        edu_model.json = {cols:[]};
                        edu_model.set('educationstatusid',get_education_id(row[4].value));
                        edu_model.set('cid',cid);
                        edu_model.save(SQL, function(res) {
                         if(res.success) {
                          var table_str = "EducationChild(ตารางข้อมูลการศึกษา)"; 
                          var message_str = ' (ข้อมูลระดับการศึกษา) '+get_education_id(row[4].value);
                          row.message_list.push({'table_name':table_str, 'message':message_str});
                          edu_model.get(SQL, cid, function(result) {
                           //console.log(result);

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
 //});
};


CSVMapping.map15 = function(config,callback) { 
 var SQL = config.sql;
  ProvinceModel.list(SQL, function(province_list) {
  TitleModel.list(SQL, function(title_list) {
  angular.forEach(config.csv.list, function(row) {
  //  var cid=row[1].value.replace(/-/g,'');
 //   var cid='C'+md5(row[1].value.replace(/-/g,'')).substring(0,12);
    var p_model = new PersonModel();
    p_model.json = {cols:[]};

    var host_id = '6580702';
    var province_id = '?';
    var title_id = '?';
    var city_id = '?';
    var tumbon_id = '?';
    row[1].value = row[1].value.replace(/\s+/,' ');
    var result = row[1].value.split(" ");
    var title = result[0];
    var firstname = result[1];
    var lastname = result[2];
    var v = md5(firstname+' '+lastname);
    var cid = 'C'+v.substring(0,12);
    console.log('Performing '+cid);
    //row[4].value = row[4].value.replace(/\s+/,' ');
    //var tumbon=r4.replace(/ต./g,'');
    var rr1 = row[4].value.replace(/ต. /,'ต.');
    var rr2 = rr1.replace(/ม. /,'ม.');
    console.log("-->");
    console.log(rr2);
    var r = rr2.split(" ");
    console.log("---->");
    console.log(r);
    //var r = row[4].value.split(" ");
    var livehousenumber = r[0]; 
    var livemoonumber = r[1]; 
    //var tumbon = r[2].replace(/ต./,''); 
    var tumbon = r[2]; 
    var city = r[4]; 
    var liveprovince_result = 'แม่ฮ่องสอน';

    row[3].value = row[3].value.replace(/\s+/,' ');
    var oresult = row[3].value.split(" ");
    var ofirstname = oresult[0];
    var olastname = oresult[1];

    for(var idx=0;idx<title_list.rows.length;idx++) {
      if(title == title_list.rows[idx].cols[1].value) {
        title_id = title_list.rows[idx].cols[0].value;
      }
    }

    for(var idx_1=0;idx_1<province_list.rows.length;idx_1++) {
      if(liveprovince_result  == province_list.rows[idx_1].cols[1].value) {
        province_id = province_list.rows[idx_1].cols[0].value;
        ProvinceModel.get_cities(SQL, province_id, function(cities) {
          var found_city = false;
          for (var idx_2=0;idx_2<cities.rows.length;idx_2++) {
            if (cities.rows[idx_2].cols[1].value == city) {
              city_id = cities.rows[idx_2].cols[0].value; 
              found_city = true;
            }
          }

          if(found_city) {
            console.log('Found City '+city+' '+city_id +' CID('+cid+') ');
            ProvinceModel.get_tumbons(SQL, city_id, function(tumbons) {
              for (var idx_3=0;idx_3<tumbons.rows.length;idx_3++) {
                if (tumbons.rows[idx_3].cols[1].value == tumbon ) {
                  tumbon_id = tumbons.rows[idx_3].cols[0].value; 
                  console.log(tumbon_id);
                }
              }

              p_model.set('cid',cid);
              p_model.set('firstname',firstname);
              p_model.set('lastname',lastname);
              p_model.set('host',host_id);
              p_model.set('dob',row[2].value);
              p_model.set('livehousenumber',livehousenumber);
              p_model.set('livemoonumber',livemoonumber);
              p_model.set('liveprovince',province_id);
              p_model.set('livecity',city_id);
              p_model.set('livetumbon',tumbon_id);
              p_model.set('title',title_id);
                //p_model.set('daterecorde','11/06/2011');
              row.message_list = [];
                //p_model.set('livehousenumber',col[5].value);
                //p_model.set('livemoonumber',col[6].value);
              p_model.save(SQL, function(res) {
               console.log('saved cid '+cid);
               console.log(res);
               if(res.success) {
                var table_str = "Person(ตารางข้อมูลผู้ด้อยโอกาส)"; 
                var message_str = 'เลขที่บัตรประชาชน: '+cid
                    +' ชื่อ-สกุล: '+firstname+' '+lastname;
                row.message_list.push({'table_name':table_str, 'message':message_str});
                p_model.get(SQL, cid, function(result) {
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
                      var message_str = ' (ข้อมูลการบริการ) Host: '+host_id;
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                     sp_model.get(SQL, cid,function(result) {
                     });
                    }
                  });
                });
               }
              });

              if(row[3].value.replace(/\s+/,'').length != 0) {
                saveFamily(SQL,[cid,ofirstname, olastname,'1'],function(res) {
                  if(res.success) {
                    var table_str = "Family(ตารางผู้ดูแล)"; 
                    var message_str = '(ข้อมูลผู้ดูแล) '+ ofirstname+ ' '+olastname;
                    row.message_list.push({'table_name':table_str, 'message':message_str});
                  }
                });
              }
            });
          } else {
            console.log('Not found '+ city + ' CID('+cid+')');
          }
        });
      } 
    }  
   });
  });
 });
};


CSVMapping.map11 = function(config,callback) { 
 var SQL = config.sql;
  OccupationModel.list(SQL, function(occupation_list) {
  ProvinceModel.list(SQL, function(province_list) {
  angular.forEach(config.csv.list, function(row) {
    var cid=row[3].value.replace(/-/g,'');
    var fid=row[46].value.replace(/-/g,'');
    var mid=row[58].value.replace(/-/g,'');
    var oid=row[71].value.replace(/-/g,'');
 //   var cid='C'+md5(row[1].value.replace(/-/g,'')).substring(0,12);
    var p_model = new PersonModel();
    p_model.json = {cols:[]};

    var gender_result = row[2].value;
    if (gender_result == 'ชาย') {
      var gender_id = 'M';  
    } else {
      var gender_id = 'F';  
    } 
    var province_id = '?';
    var focc_id = '?';
    var mocc_id = '?';
    var oocc_id = '?';
    var city_id = '?';
    var tumbon_id = '?';
    var day_month = row[5].value.split("/");
    console.log(day_month[0]);
    console.log(day_month[1]);
    console.log(day_month[2]);
    var year = parseInt(day_month[2])-543;
    var dob = day_month[1]+'/'+day_month[0]+'/'+year.toString();
    console.log(dob);
    row[1].value = row[1].value.replace(/\s+/,' ');
    var result = row[1].value.split(" ");
    var firstname = result[0];
    var lastname = result[1];

    row[43].value = row[43].value.replace(/\s+/,' ');
    var fresult = row[43].value.split(" ");
    console.log("---->");  
    console.log(fresult);
    var ffirstname = fresult[0];
    var flastname = fresult[1];
    
    row[55].value = row[55].value.replace(/\s+/,' ');
    var mresult = row[55].value.split(" ");
    console.log("---->");  
    console.log(mresult);
    var mfirstname = mresult[0];
    var mlastname = mresult[1];

    row[68].value = row[68].value.replace(/\s+/,' ');
    var oresult = row[68].value.split(" ");
    console.log("---->");  
    console.log(oresult);
    var ofirstname = oresult[0];
    var olastname = oresult[1];

    var focc_result = get_occupation_id(row[45].value);
    var mocc_result = get_occupation_id(row[57].value);
    var oocc_result = get_occupation_id(row[70].value);
    var city = row[15].value+row[16].value; 
      
    var found_focc = false;
    for(var idx=0;idx<occupation_list.rows.length;idx++) {
      if(focc_result == occupation_list.rows[idx].cols[0].value) {
        focc_id = occupation_list.rows[idx].cols[0].value;
        found_focc = true;
      }
    }
    var found_mocc = false;
    for(var idx=0;idx<occupation_list.rows.length;idx++) {
      if(mocc_result == occupation_list.rows[idx].cols[0].value) {
        mocc_id = occupation_list.rows[idx].cols[0].value;
        found_mocc = true;
      }
    }
    var found_oocc = false;
    for(var idx=0;idx<occupation_list.rows.length;idx++) {
      if(oocc_result == occupation_list.rows[idx].cols[0].value) {
        oocc_id = occupation_list.rows[idx].cols[0].value;
        found_oocc = true;
      }
    }

    for(var idx_1=0;idx_1<province_list.rows.length;idx_1++) {
      if(row[16].value  == province_list.rows[idx_1].cols[1].value) {
        province_id = province_list.rows[idx_1].cols[0].value;
        ProvinceModel.get_cities(SQL, province_id, function(cities) {
          var found_city = false;
          for (var idx_2=0;idx_2<cities.rows.length;idx_2++) {
            if (cities.rows[idx_2].cols[1].value == city) {
              city_id = cities.rows[idx_2].cols[0].value; 
              found_city = true;
            }
          }

          if(found_city) {
            console.log('Found City '+city+' '+city_id +' CID('+cid+') ');
            ProvinceModel.get_tumbons(SQL, city_id, function(tumbons) {
              for (var idx_3=0;idx_3<tumbons.rows.length;idx_3++) {
                if (tumbons.rows[idx_3].cols[1].value == row[14].value) {
                  tumbon_id = tumbons.rows[idx_3].cols[0].value; 
                  console.log(tumbon_id);
                }
              }

              p_model.set('cid',cid);
              p_model.set('firstname',firstname);
              p_model.set('lastname',lastname);
              //p_model.set('dob',row[5].value);
              p_model.set('nation',row[21].value);
              p_model.set('race',row[20].value);
              p_model.set('religion',row[22].value);
              p_model.set('livehousenumber',row[9].value);
              p_model.set('livemoonumber',row[10].value);
              p_model.set('livevillagename',row[11].value);
              p_model.set('livealley',row[12].value);
              p_model.set('livestreetname',row[13].value);
              p_model.set('liveprovince',province_id);
              p_model.set('livepostcode',row[17].value);
              p_model.set('livecity',city_id);
              p_model.set('livetumbon',tumbon_id);
              p_model.set('dob',dob);
              row.message_list = [];
              p_model.save(SQL, function(res) {
               console.log('saved cid '+cid);
               console.log(res);
               if(res.success) {
                var table_str = "Person(ตารางข้อมูลผู้ด้อยโอกาส)"; 
                var message_str = 'เลขที่บัตรประชาชน: '+cid
                    +' ชื่อ-สกุล: '+firstname+' '+lastname;
                row.message_list.push({'table_name':table_str, 'message':message_str});
                p_model.get(SQL, cid, function(result) {
                  var edu_model = new EducationChildModel();
                  edu_model.json = {cols:[]};
                  edu_model.set('educationstatusid',get_education_id(row[28].value));
                  edu_model.set('cid',cid);
                  edu_model.set('schoolname',row[30].value);
                  edu_model.set('class',row[29].value);
                  edu_model.save(SQL, function(res) {
                    if(res.success) {
                      var table_str = "EducationChild(ตารางข้อมูลการศึกษา)"; 
                      var message_str = '(ข้อมูลระดับการศึกษา) '+get_education_id(row[28].value);
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                      edu_model.get(SQL, cid, function(res) {

                      });
                    }
                  });
                });
               }
              });

              if(row[43].value.replace(/\s+/,'').length != 0) {
                  saveFamily1(SQL,[cid,ffirstname, flastname,'1',fid,focc_id,get_education_id(row[49].value)],function(res) {
                    if(res.success) {
                      console.log('Found Occupation '+focc_result+' '+focc_id +' CID('+cid+') ');
                      var table_str = "Family(ตารางผู้ดูแล)"; 
                      var message_str = '(ข้อมูลบิดา) '+ ffirstname+ ' '+flastname;
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                    }
                  });
              }
              if(row[55].value.replace(/\s+/,'').length != 0) {
                  saveFamily1(SQL,[cid,mfirstname, mlastname,'2',mid,mocc_id,get_education_id(row[61].value)],function(res) {
                    if(res.success) {
                      var table_str = "Family(ตารางผู้ดูแล)"; 
                      var message_str = '(ข้อมูลมารดา) '+ mfirstname+ ' '+mlastname;
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                    }
                  });
              }
              if(row[68].value.replace(/\s+/,'').length != 0) {
                  saveFamily1(SQL,[cid,ofirstname, olastname,'13',oid,oocc_id,get_education_id(row[74].value)],function(res) {
                    if(res.success) {
                      var table_str = "Family(ตารางผู้ดูแล)"; 
                      var message_str = '(ข้อมูลผู้ดูแล) '+ ofirstname+ ' '+olastname;
                      row.message_list.push({'table_name':table_str, 'message':message_str});
                    }
                  });
              }
            });
            //});
          } else {
            console.log('Not found '+ city + ' CID('+cid+')');
          }
        });
      } 
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
   'name':'กระทรวงพัฒนาสังคมฯ - สรุปยอดผู้รับเบี้ยยังชีพ - สรุปยอดผู้รับเบี้ยผู้สูงอายุ', 
   'function':CSVMapping.map4 
  },
  {
   'name':'กระทรวงพัฒนาสังคมฯ - ทะเบียนคนพิการ จังหวัดแม่ฮ่องสอน', 
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
  /*
  {
   'name':'กระทรวงสาธารณสุข - รพ.สตสำโรงใต้- วัคซีน 0-1ปี ', 
   'function':CSVMapping.map18 
  },
  {
   'name':'กระทรวงสาธารณสุข - รพ.สตสำโรงใต้- วัคซีน 4-5ปี ', 
   'function':CSVMapping.map19 
  },
  */
  {
   'name':'กระทรวงสาธารณสุข - รพ.สตถ้ำลอด- งานค่ารักษาเลข678', 
   'function':CSVMapping.map8 
  },
  /*
  {
   ' name':'สาธารณสุข_รพ.สตถ้ำลอด_exportข้อมูลตรวจ' , 
   'function':CSVMapping.map20 
  },
  */
  {
   'name':'กระทรวงสาธารณสุข - กายอุปกรณ์- กายอุปกรณ์ แม่ลาน้อย ', 
   'function':CSVMapping.map9 
  },
  {
   'name':'กระทรวงสาธารณสุข - กายอุปกรณ์- กายอุปกรณ์ ศรีสังวาลย์ ', 
   'function':CSVMapping.map10 
  },
  /*
  {
   'name':'อบต.แม่นาเติง', 
   'function':CSVMapping.map14 
  },
  {
   'name':'อบต.สบป่อง', 
   'function':CSVMapping.map15 
  },
  */
  {
   'name':'case manager - แยกตำบล', 
   'function':CSVMapping.map11 
  }
];
