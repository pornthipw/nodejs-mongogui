
function CSVMapping() {
};

function isValidThaiID(str) {
 // console.log(str);
  var pattern = /^(\d{13})?$/;
  console.log(str);
  return pattern.test(str);
}

CSVMapping.map_xx = function(config, callback) { 
 //console.log("OK");
  //console.log(config.csv.list);
  var SQL = config.sql;
  TitleModel.list(SQL, function(title_list) {
   // GenderModel.list(SQL, function(gender_list) {
    //  HostModel.list(SQL, function(host_list) {
     //   ProvinceModel.list(SQL, function(province_list) {
          //console.log(title_list);
          angular.forEach(config.csv.list, function(row) {
            console.log(row);    
            if(isValidThaiID(row['CID'])) {
              var p_model = new PersonModel();
              p_model.json = {cols:[]};

              var title_id = '?';
             // var gender_id = '?';
             // var host_id = '?';
             // var province_id = '?';
              var tid = '00'+row['PRENAME'];

              for(var idx=0;idx<title_list.rows.length;idx++) {
                if(tid == title_list.rows[idx].cols[0].value) {
                  title_id = title_list.rows[idx].cols[1].value;
                }
              }

              //for(var idx=0;idx<gender_list.rows.length;idx++) {
              //  if(row['SEX'] == gender_list.rows[idx].cols[0].value) {
              //    gender_id = gender_list.rows[idx].cols[0].value;
              //  }
              //}

              //for(var idx=0;idx<host_list.rows.length;idx++) {
              //  if(row['HID'] == host_list.rows[idx].cols[0].value) {
              //    host_id = host_list.rows[idx].cols[0].value;
              //  }
              //}

              //for(var idx=0;idx<province_list.rows.length;idx++) {
              //  if(row['CHANGWAT'] == province_list.rows[idx].cols[0].value) {
              //    province_id = province_list.rows[idx].cols[0].value;
              //  }
              //}

              p_model.set('title_id',title_id);
              p_model.set('gender_id',row['SEX']);
              p_model.set('host_id',row['HID']);
              p_model.set('province_id',row['CHANGWAT']);
              p_model.set('cid',row['CID']);
              p_model.set('firstname',row['NAME']);
              p_model.set('lastname',row['LNAMAE']);
              p_model.set('livehousenumber',row['HOUSE']);
              //p_model.set('race',row['RACE']);
              p_model.set('nation',row['NATION']);
              p_model.set('religion',row['RELIGION']);

              p_model.save(SQL, function(res) {
                console.log(res);
              }); 
              //console.log(p_model);
              callback( p_model);
            } else {
              console.log('Error');
            }
          });
        //});
      //});
    //});
  });
}


CSVMapping.schema = [
  {'name':'พม.-F21_06850-Person',
    'function':CSVMapping.map1},
];
