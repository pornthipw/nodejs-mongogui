function PersonModel() {
  var self = this;
  this.json = null;
  
  this.table_name = function() {
    return "Person";
  }
  
  this.set = function(colName, value) {
    switch(colName) {
      case 'cid': index = 0; break;
      case 'title_id': index = 1; break;
      case 'firstname': index = 2; break;
      case 'lastname': index = 3; break;
      case 'gender_id': index = 5; break;
      case 'religion': index = 9; break;
      case 'livehousenumber': index = 13; break;
      case 'livemoonumber': index = 14; break;
      case 'livevillagename': index = 15; break;
      case 'livetumbon': index = 18; break;
      case 'livecity': index = 19; break;
      case 'liveprovince': index = 20; break;
      case 'livepostcode': index = 21; break;
      case 'daterecord': index = 46; break;
      //case 'mariagestatus': index = 9; break;
      default:
        console.log('Not found '+colName);
        index=-1;
    };

    if(index!=-1) {
      for(var i=0;i<index;i++) {
        if(!self.json.cols[i]) { 
          self.json.cols[i] = {'value':undefined};
        }
      }
      self.json.cols[index] = {'value':value};
    }
  };
  
  this.assign_params = function() {
    //var attrs = 18;
    var attrs = 50;
    for(var i=0;i<attrs;i++) {
      if(!self.json.cols[i]) {
        self.json.cols[i] = {value:undefined};
      }
    }

    var params = [
      {'name':'cid', 'type':'VarChar', 'value':self.json.cols[0].value},
      {'name':'title', 'type':'VarChar', 'value':self.json.cols[1].value},
      {'name':'firstname', 'type':'VarChar', 'value':self.json.cols[2].value},
      {'name':'lastname', 'type':'VarChar', 'value':self.json.cols[3].value},
      {'name':'gender', 'type':'VarChar', 'value':self.json.cols[5].value},
      {'name':'religion', 'type':'VarChar', 'value':self.json.cols[9].value},
      {'name':'livehousenumber', 'type':'VarChar', 'value':self.json.cols[13].value},
      {'name':'livemoonumber', 'type':'VarChar', 'value':self.json.cols[14].value},
      {'name':'livevillagename', 'type':'VarChar', 'value':self.json.cols[15].value},
      {'name':'livetumbon', 'type':'VarChar', 'value':self.json.cols[18].value},
      {'name':'livecity', 'type':'VarChar', 'value':self.json.cols[19].value},
      {'name':'liveprovince', 'type':'VarChar', 'value':self.json.cols[20].value},
      {'name':'livepostcode', 'type':'VarChar', 'value':self.json.cols[21].value},
      {'name':'daterecord', 'type':'VarChar', 'value':self.json.cols[46].value}
    ];
    return params;
  };

  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from Person' 
    });
    SQL.query({'query':query_str},callback);
  };


  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from Person where CID = "'+id+'"'
    });
    console.log(query_str);
    SQL.query({'query':query_str},function(res) {
      //console.log("-->"+res);
      if(res.rows.length==1) {
        self.json = res.rows[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  this.save = function(SQL,callback) {
    console.log('CID = '+self.json.cols[0].value);
    var query_str = JSON.stringify({
     sql:'select * from Person where CID = "'+self.json.cols[0].value+'"'
    });
   
    SQL.query({'query':query_str},function(res) {
      if(res.rows.length==0) {
        self.insert(SQL, callback);
      } else {
        console.log('content updating');
        console.log(res);
        self.update(SQL, callback);
      }
    });
  };

  this.insert = function(SQL, callback) {
    var query = "INSERT INTO Person" 
      +" (CID,"
      +" Title,"
      +" FirstName,"
      +" LastName,"
      +" Gender,"
      +" Religion,"
      +" LiveHouseNumber,"
      +" LiveMooNumber,"
      +" LiveVillageName,"
      +" LiveTumbon,"
      +" LiveCity,"
      +" LiveProvince,"
      +" LivePostCode,"
      +" DateRecorde)"
      +" VALUES " 
      +" (@cid," 
      +"  @title," 
      +"  @firstname," 
      +"  @lastname," 
      +"  @gender," 
      +"  @religion," 
      +"  @livehousenumber,"
      +"  @livemoonumber,"
      +"  @livevillagename,"
      +"  @livetumbon,"
      +"  @livecity,"
      +"  @liveprovince,"
      +"  @livepostcode,"
      +"  @daterecord)";
    //console.log(query);
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res.success);
    });
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE Person SET Title=@title, "
      +" FirstName = @firstname,"
      +" LastName = @lastname,"
      +" Gender = @gender,"
      +" Religion = @religion,"
      +" LiveHouseNumber = @livehousenumber,"
      +" LiveMooNumber = @livemoonumber,"
      +" LiveVillageName = @livevillagename,"
      +" LiveTumbon = @livetumbon,"
      +" LiveCity = @livecity,"
      +" LiveProvince = @liveprovince,"
      +" LivePostCode = @livepostcode,"
      +" DateRecorde = @daterecord"
      +" WHERE " 
      +" CID = @cid";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res);
    });
  };

}

function TitleModel() {
}

TitleModel.list = function(SQL,callback) {
  console.log(SQL);
  var query_str = JSON.stringify({
   sql:'select * from Title' 
  });
  SQL.query({'query':query_str},callback);
};

function ProvinceModel(){
  var self = this;
  this.json = null;

  this.assign_params = function() {
    var params = [
      {'name':'id', 'type':'VarChar', 'value':self.json.cols[0].value},
      {'name':'desc', 'type':'VarChar', 'value':self.json.cols[1].value}
    ];
    return params;
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE Province SET ProvinceDescription=@desc WHERE " 
      +" ProvinceID = @id";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res.success);
    });
  };
  
  this.insert = function(SQL, callback) {
    var query = "INSERT INTO Province (ProvinceID, ProvinceDescription)" 
      +" VALUES (@id, @desc)";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res.success);
    });
  };
  
  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from Province where ProvinceID = "'+id+'"'
    });
    SQL.query({'query':query_str},function(res) {
      if(res.length==1) {
        self.json = res[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };
  
  
  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from Province' 
    });
    SQL.query({'query':query_str},callback);
  };

  this.get_cities = function(SQL, callback) {
    if(self.json) {
      var query_str = JSON.stringify({
       sql:'select * from City where ProvinceID = "'+self.json.cols[0].value+'"'
      });
      SQL.query({'query':query_str},callback);
    } else {
      callback([]);
    }
  };
}

ProvinceModel.list = function(SQL,callback) { 
  var query_str = JSON.stringify({
   sql:'select * from Province' 
  });
  SQL.query({'query':query_str},callback);
};

ProvinceModel.get_cities = function(SQL, province_id, callback) {
  var query_str = JSON.stringify({
    sql:'select * from City where ProvinceID = "'+province_id+'"'
  });
  SQL.query({'query':query_str},callback);
};

ProvinceModel.get_tumbons = function(SQL, city_id, callback) {
  var query_str = JSON.stringify({
    sql:'select * from Tumbon where CityID = "'+city_id+'"'
  });
  SQL.query({'query':query_str},callback);
};

//Gender
function GenderModel(){
  var self = this;
  this.json = null;

  this.assign_params = function() {
    var params = [
      {'name':'id', 'type':'VarChar', 'value':self.json.cols[0].value},
      {'name':'thaidesc', 'type':'VarChar', 'value':self.json.cols[1].value},
      {'name':'engdesc', 'type':'VarChar', 'value':self.json.cols[2].value}
    ];
    return params;
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE Gender SET GenderThaiDescription=@thaidesc WHERE " 
      +" GenderCode = @id";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res.success);
    });
  };
  
  this.insert = function(SQL, callback) {
    var query = "INSERT INTO Gender (GenderCode, GenderThaiDescription, GenderEnglishDescription)" 
      +" VALUES (@id, @thaidesc, @engdesc)";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res.success);
    });
  };
  
  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from Gender where GenderCode = "'+id+'"'
    });
    SQL.query({'query':query_str},function(res) {
      if(res.length==1) {
        self.json = res[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };
  
  
  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from Gender' 
    });
    SQL.query({'query':query_str},callback);
  };

}

GenderModel.list = function(SQL,callback) { 
  var query_str = JSON.stringify({
   sql:'select * from Gender' 
  });
  SQL.query({'query':query_str},callback);
};

//MariageStatus
function MariageStatusModel(){
  var self = this;
  this.json = null;

  this.assign_params = function() {
    var params = [
      {'name':'id', 'type':'VarChar', 'value':self.json.cols[0].value},
      {'name':'mariagedesc', 'type':'VarChar', 'value':self.json.cols[1].value}
    ];
    return params;
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE  MariageStatus SET MariageStatusDescription=@mariagedesc WHERE " 
      +" MariageStatusID = @id";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res.success);
    });
  };
  
  this.insert = function(SQL, callback) {
    var query = "INSERT INTO  MariageStatus (MariageStatusID, MariageStatusDescription)" 
      +" VALUES (@id, @mariagedesc)";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res.success);
    });
  };
  
  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from  MariageStatus where MariageStatusID = "'+id+'"'
    });
    SQL.query({'query':query_str},function(res) {
      if(res.length==1) {
        self.json = res[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };
  
  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from  MariageStatus' 
    });
    SQL.query({'query':query_str},callback);
  };

}

MariageStatusModel.list = function(SQL,callback) { 
  var query_str = JSON.stringify({
   sql:'select * from MariageStatus' 
  });
  SQL.query({'query':query_str},callback);
};
//Host

function HostModel(){
  var self = this;
  this.json = null;

  this.assign_params = function() {
    var params = [
      {'name':'id', 'type':'VarChar', 'value':self.json.cols[0].value},
      {'name':'desc', 'type':'VarChar', 'value':self.json.cols[1].value},
      {'name':'staddress', 'type':'VarChar', 'value':self.json.cols[2].value},
      {'name':'stname', 'type':'VarChar', 'value':self.json.cols[2].value},
      {'name':'city', 'type':'VarChar', 'value':self.json.cols[3].value},
      {'name':'province', 'type':'VarChar', 'value':self.json.cols[4].value},
      {'name':'postcode', 'type':'VarChar', 'value':self.json.cols[5].value},
      {'name':'typeid', 'type':'VarChar', 'value':self.json.cols[6].value},
      {'name':'tumbon', 'type':'VarChar', 'value':self.json.cols[7].value}
    ];
    return params;
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE Host SET"
      +" HostName=@desc,"
      +" HostStreetAddress=@staddress,"
      +" HostStreetName=@stname,"
      +" HostCity=@city,"
      +" HostProvince=@province,"
      +" HostPostcode=@postcode,"
      +" HostTypeID=@typeid,"
      +" HostTunbon=@tumbon,"
      +" WHERE " 
      +" HostID = @id";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res.success);
    });
  };
  
  this.insert = function(SQL, callback) {
    var query = "INSERT INTO Host"
      +" (HostID, HostName,"
      +" HostStreetAddress, HostStreetName,"
      +" HostCity, HostProvince,"
      +" HostPostcode, HostTypeID,"
      +" HostTumbon)" 
      +" VALUES (@id,"
      +" @desc,@staddress,@stname,@city,@province,"
      +" @postcode,@typeid,@tumbon,@desc)";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res.success);
    });
  };
  
  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from Host where HostID = "'+id+'"'
    });
    SQL.query({'query':query_str},function(res) {
      if(res.length==1) {
        self.json = res[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };
  
  
  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from Host' 
    });
    SQL.query({'query':query_str},callback);
  };

}

HostModel.list = function(SQL,callback) { 
  var query_str = JSON.stringify({
   sql:'select * from Host' 
  });
  SQL.query({'query':query_str},callback);
};
//GeneralAttribute
function GeneralAttributesModel() {
  var self = this;
  this.json = null;
  
  this.table_name = function() {
    return "GeneralAttribute1";
  }
  
  this.set = function(colName, val) {
    switch(colName) {
      case 'key': index = 0; break;
      case 'attribute': index = 1; break;
      case 'value': index = 2; break;
      default:
        console.log('Not found '+colName);
        index=-1;
    };

    if(index!=-1) {
      for(var i=0;i<index;i++) {
        if(!self.json.cols[i]) { 
          self.json.cols[i] = {'value':undefined};
        }
      }
      self.json.cols[index] = {'value':val};
    }
  };
  
  this.assign_params = function() {
    var attrs = 10;
    for(var i=0;i<attrs;i++) {
      if(!self.json.cols[i]) {
        self.json.cols[i] = {value:undefined};
      }
    }

    var params = [
      {'name':'key', 'type':'VarChar', 'value':self.json.cols[0].value},
      {'name':'attribute', 'type':'VarChar', 'value':self.json.cols[1].value},
      {'name':'value', 'type':'VarChar', 'value':self.json.cols[2].value}
    ];
    return params;
  };

  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from GeneralAttribute1' 
    });
    SQL.query({'query':query_str},callback);
  };


  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from GeneralAttribute1 where KeyID = "'+id+'"'
    });
    console.log(query_str);
    SQL.query({'query':query_str},function(res) {
      //console.log("-->"+res);
      if(res.rows.length==1) {
        self.json = res.rows[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  this.save = function(SQL,callback) {
    console.log('KeyID = '+self.json.cols[0].value);
    console.log('Attribute = '+self.json.cols[1].value);
    console.log('Value = '+self.json.cols[2].value);
    var query_str = JSON.stringify({
     sql:'select * from GeneralAttribute1 where KeyID = "'+
        self.json.cols[0].value+'" and Attribute = "'+
        self.json.cols[1].value+'"'
    });
   
    SQL.query({'query':query_str},function(res) {
      if(res.rows.length==0) {
        self.insert(SQL, callback);
      } else {
        console.log('content updating');
        console.log(res);
        self.update(SQL, callback);
      }
    });
  };

  this.insert = function(SQL, callback) {
    var query = "INSERT INTO GeneralAttribute1" 
      +" (KeyID,"
      +" Attribute,"
      +" Value)"
      +" VALUES " 
      +" (@key," 
      +"  @attribute," 
      +"  @value)";
    //console.log(query);
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      console.log(res);
      callback(res.success);
    });
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE GeneralAttribute1 SET Attribute=@attribute, "
      +" Value = @value,"
      +" WHERE " 
      +" KeyID = @key";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res);
    });
  };
};

GeneralAttributesModel.push = function(SQL,key,attribute,value,callback) {
  var query = "INSERT INTO GeneralAttribute1" 
    +" (KeyID,"
    +" Attribute,"
    +" Value)"
    +" VALUES " 
    +" (@key," 
    +"  @attribute," 
    +"  @value)";
  var params = [
    {'name':'key', 'type':'VarChar', 'value':key},
    {'name':'attribute', 'type':'VarChar', 'value':attribute},
    {'name':'value', 'type':'VarChar', 'value':value}
  ];
  SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
    function(res) {
    callback(res);
  });
};
  
function DisabilityEvaluationModel() {
  var self = this;
  this.json = null;
  
  this.table_name = function() {
    return "DisabilityEvaluation";
  }
  
  this.set = function(colName, val) {
    switch(colName) {
      case 'cid': index = 0; break;
      case 'caseno': index = 1; break;
      case 'disabilitycode': index = 2; break;
      case 'recorderid': index = 3; break;
      case 'evaldatetime': index = 4; break;
      default:
        console.log('Not found '+colName);
        index=-1;
    };

    if(index!=-1) {
      for(var i=0;i<index;i++) {
        if(!self.json.cols[i]) { 
          self.json.cols[i] = {'value':undefined};
        }
      }
      self.json.cols[index] = {'value':val};
    }
  };
  
  this.assign_params = function() {
    var attrs = 10;
    for(var i=0;i<attrs;i++) {
      if(!self.json.cols[i]) {
        self.json.cols[i] = {value:undefined};
      }
    }

    var params = [
      {'name':'cid', 'type':'VarChar', 'value':self.json.cols[0].value},
      {'name':'caseno', 'type':'VarChar', 'value':self.json.cols[1].value},
      {'name':'disabilitycode', 'type':'VarChar', 'value':self.json.cols[2].value},
      {'name':'recorderid', 'type':'VarChar', 'value':self.json.cols[3].value},
      {'name':'evaldatetime', 'type':'VarChar', 'value':self.json.cols[4].value}
    ];
    return params;
  };

  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from DisabilityEvaluation' 
    });
    SQL.query({'query':query_str},callback);
  };


  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from DisabilityEvaluation where CID = "'+cid+'"'
    });
    console.log(query_str);
    SQL.query({'query':query_str},function(res) {
      //console.log("-->"+res);
      if(res.rows.length==1) {
        self.json = res.rows[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  this.save = function(SQL,callback) {
    console.log('CID = '+self.json.cols[0].value);
    console.log('CaseNo = '+self.json.cols[1].value);
    console.log('DisabilityCode = '+self.json.cols[2].value);
    console.log('RecoderID = '+self.json.cols[3].value);
    console.log('EvalDateTime = '+self.json.cols[4].value);
    var query_str = JSON.stringify({
     sql:'select * from DisabilityEvaluation where CID = "'+
        self.json.cols[0].value+'" and CaseNo = "'+
        self.json.cols[1].value+'" and DisabilityCode = "'+
        self.json.cols[2].value+'" and RecorderID = "'+
        self.json.cols[3].value+'"'
    });
   
    SQL.query({'query':query_str},function(res) {
      if(res.rows.length==0) {
        self.insert(SQL, callback);
      } else {
        console.log('content updating');
        console.log(res);
        self.update(SQL, callback);
      }
    });
  };

  this.insert = function(SQL, callback) {
    var query = "INSERT INTO DisabilityEvaluation" 
      +" (CID,"
      +" CaseNo,"
      +" DisabilityCode,"
      +" RecorderID,"
      +" EvalDateTime)"
      +" VALUES " 
      +" (@cid," 
      +"  @caseno," 
      +"  @disabilitycode," 
      +"  @recorderid," 
      +"  @evaldatetime)";
    //console.log(query);
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      console.log(res);
      callback(res.success);
    });
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE DisabilityEvaluation SET CaseNo=@caseno, "
      +" DisabilityCode = @disabilitycode,"
      +" RecorderID = @recorderid,"
      +" EvalDateTime = @evaldatetime,"
      +" WHERE " 
      +" CID = @cid";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res);
    });
  };
};


function DiagnosisEvaluationModel() {
  var self = this;
  this.json = null;
  
  this.table_name = function() {
    return "DiagnosisEvaluation";
  }
  
  this.set = function(colName, val) {
    switch(colName) {
      case 'cid': index = 0; break;
      case 'caseno': index = 1; break;
      case 'disabilitycode': index = 2; break;
      case 'recorderid': index = 3; break;
      case 'evaldatetime': index = 4; break;
      default:
        console.log('Not found '+colName);
        index=-1;
    };

    if(index!=-1) {
      for(var i=0;i<index;i++) {
        if(!self.json.cols[i]) { 
          self.json.cols[i] = {'value':undefined};
        }
      }
      self.json.cols[index] = {'value':val};
    }
  };
  
  this.assign_params = function() {
    var attrs = 10;
    for(var i=0;i<attrs;i++) {
      if(!self.json.cols[i]) {
        self.json.cols[i] = {value:undefined};
      }
    }

  var params = [
    {'name':'cid', 'type':'VarChar', 'value':self.json.cols[0].value},
    {'name':'discode', 'type':'VarChar', 'value':self.json.cols[1].value},
    {'name':'diagcode', 'type':'VarChar', 'value':self.json.cols[2].value},
    {'name':'satffid', 'type':'VarChar', 'value':self.json.cols[3].value},
    {'name':'evaldatetime', 'type':'VarChar', 'value':self.json.cols[4].value},
    {'name':'datedx', 'type':'VarChar', 'value':self.json.cols[5].value}
  ];
    return params;
  };

  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from DiagnosisEvaluation' 
    });
    SQL.query({'query':query_str},callback);
  };


  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from DiagnosisEvaluation where CID = "'+cid+'"'
    });
    console.log(query_str);
    SQL.query({'query':query_str},function(res) {
      //console.log("-->"+res);
      if(res.rows.length==1) {
        self.json = res.rows[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  this.save = function(SQL,callback) {
    console.log('CID = '+self.json.cols[0].value);
    console.log('DISCode = '+self.json.cols[1].value);
    console.log('DIAGCode = '+self.json.cols[2].value);
    console.log('StaffID = '+self.json.cols[3].value);
    console.log('EvalDateTime = '+self.json.cols[4].value);
    console.log('DATEDX = '+self.json.cols[4].value);
    var query_str = JSON.stringify({
     sql:'select * from DiagnosisEvaluation where CID = "'+
        self.json.cols[0].value+'" and DISCode = "'+
        self.json.cols[1].value+'" and DIAGCode = "'+
        self.json.cols[2].value+'" and StaffID = "'+
        self.json.cols[3].value+'" and EvalDateTime = "'+
        self.json.cols[4].value+'" and DATEDX = "'+
        self.json.cols[5].value+'"'
    });
   
    SQL.query({'query':query_str},function(res) {
      if(res.rows.length==0) {
        self.insert(SQL, callback);
      } else {
        console.log('content updating');
        console.log(res);
        self.update(SQL, callback);
      }
    });
  };

  this.insert = function(SQL, callback) {
   var query = "INSERT INTO DiagnosisEvaluation" 
     +" (CID,"
     +" DISCode,"
     +" DIAGCode,"
     +" StaffID,"
     +" EvalDateTime,"
     +" DATDX)"
     +" VALUES " 
     +" (@cid," 
     +"  @discode," 
     +"  @diagcode," 
     +"  @satffid," 
     +"  @evaldatetime,";
     +"  @datedx)";
    //console.log(query);
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      console.log(res);
      callback(res.success);
    });
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE DiagnosisEvaluation SET DISCode=@discode, "
      +" DIAGCode = @diagcode,"
      +" StaffID = @staffid,"
      +" EvalDateTime = @evaldatetime,"
      +" DATEDX = @datedx,"
      +" WHERE " 
      +" CID = @cid";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res);
    });
  };
};


DiagnosisEvaluationModel.push = function(SQL,cid,discode,diagcode,diagcode,staffid,evaldatetime,datedx,callback) {
   var query = "INSERT INTO DiagnosisEvaluation" 
     +" (CID,"
     +" DISCode,"
     +" DIAGCode,"
     +" StaffID,"
     +" EvalDateTime,"
     +" DATDX)"
     +" VALUES " 
     +" (@cid," 
     +"  @discode," 
     +"  @diagcode," 
     +"  @satffid," 
     +"  @evaldatetime,";
     +"  @datedx)";
  var params = [
    {'name':'cid', 'type':'VarChar', 'value':self.json.cols[0].value},
    {'name':'discode', 'type':'VarChar', 'value':self.json.cols[1].value},
    {'name':'diagcode', 'type':'VarChar', 'value':self.json.cols[2].value},
    {'name':'satffid', 'type':'VarChar', 'value':self.json.cols[3].value},
    {'name':'evaldatetime', 'type':'VarChar', 'value':self.json.cols[4].value},
    {'name':'datedx', 'type':'VarChar', 'value':self.json.cols[5].value}
  ];
  SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
    function(res) {
    callback(res);
  });
};
  

function FamilyModel() {
  var self = this;
  this.json = null;
  
  this.table_name = function() {
    return "Family";
  }
  
  this.set = function(colName, val) {
    switch(colName) {
      case 'fmembercid': index = 0; break;
      case 'cid': index = 1; break;
      case 'title': index = 2; break;
      case 'relation': index = 3; break;
      case 'firstname': index = 4; break;
      case 'lastname': index = 5; break;
      case 'mariagestatus': index = 6; break;
      case 'educationlevel': index = 8; break;
      case 'occupation': index = 9; break;
      case 'livehousenumber': index = 17; break;
      case 'livemoonumber': index = 18; break;
      case 'livevillagename': index = 19; break;
      case 'livetumbon': index = 22; break;
      case 'livecity': index = 23; break;
      case 'liveprovince': index = 24; break;
      case 'livepostcode': index = 25; break;
      case 'carerstattus': index = 42; break;
      case 'datetimeupdate': index = 43; break;
      default:
        console.log('Not found '+colName);
        index=-1;
    };

    if(index!=-1) {
      for(var i=0;i<index;i++) {
        if(!self.json.cols[i]) { 
          self.json.cols[i] = {'value':undefined};
        }
      }
      self.json.cols[index] = {'value':val};
    }
  };
  
  this.assign_params = function() {
    var attrs = 20;
    for(var i=0;i<attrs;i++) {
      if(!self.json.cols[i]) {
        self.json.cols[i] = {value:undefined};
      }
    }

  var params = [
    {'name':'fmembercid', 'type':'VarChar', 'value':self.json.cols[0].value},
    {'name':'cid', 'type':'VarChar', 'value':self.json.cols[1].value},
    {'name':'title', 'type':'VarChar', 'value':self.json.cols[2].value},
    {'name':'relation', 'type':'VarChar', 'value':self.json.cols[3].value},
    {'name':'firstname', 'type':'VarChar', 'value':self.json.cols[4].value},
    {'name':'lastname', 'type':'VarChar', 'value':self.json.cols[5].value},
    {'name':'mariagestatus', 'type':'VarChar', 'value':self.json.cols[6].value},
    {'name':'educationlevel', 'type':'VarChar', 'value':self.json.cols[7].value},
    {'name':'occupation', 'type':'VarChar', 'value':self.json.cols[8].value},
    {'name':'livehousenumber', 'type':'VarChar', 'value':self.json.cols[17].value},
    {'name':'livemoonumber', 'type':'VarChar', 'value':self.json.cols[18].value},
    {'name':'livevillagename', 'type':'VarChar', 'value':self.json.cols[19].value},
    {'name':'livetumbon', 'type':'VarChar', 'value':self.json.cols[20].value},
    {'name':'livecity', 'type':'VarChar', 'value':self.json.cols[21].value},
    {'name':'liveprovince', 'type':'VarChar', 'value':self.json.cols[22].value},
    {'name':'livepostcode', 'type':'VarChar', 'value':self.json.cols[23].value},
    {'name':'carerstatus', 'type':'VarChar', 'value':self.json.cols[42].value},
    {'name':'datetimeupdate', 'type':'DateTime', 'value':self.json.cols[43].value}
  ];
    return params;
  };

  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from Family' 
    });
    SQL.query({'query':query_str},callback);
  };


  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from Family where CID = "'+cid+'"'
    });
    console.log(query_str);
    SQL.query({'query':query_str},function(res) {
      //console.log("-->"+res);
      if(res.rows.length==1) {
        self.json = res.rows[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  this.save = function(SQL,callback) {
    console.log('CID = '+self.json.cols[0].value);
    var query_str = JSON.stringify({
     sql:'select * from Family where CID = "'+self.json.cols[0].value+'"'
    });
   
    SQL.query({'query':query_str},function(res) {
      if(res.rows.length==0) {
        self.insert(SQL, callback);
      } else {
        console.log('content updating');
        console.log(res);
        self.update(SQL, callback);
      }
    });
  };

  this.insert = function(SQL, callback) {
    //console.log(query);
    var query = "INSERT INTO Family" 
      +" (FMemberCID,"
      +" CID,"
      +" Title,"
      +" Relation,"
      +" FirstName,"
      +" LastName,"
      +" MariageStatus,"
      +" EducationLevel,"
      +" Occupation,"
      +" LiveHouseNumber,"
      +" LiveMooNumber,"
      +" LiveVillageName,"
      +" LiveTumbon,"
      +" LiveCity,"
      +" LiveProvince,"
      +" LivePostCode,"
      +" CarerStatus,"
      +" DateTimeUpdate)"
      +" VALUES " 
      +" (@fmembercid," 
      +"  @cid," 
      +"  @title," 
      +"  @relation," 
      +"  @firstname," 
      +"  @lastname," 
      +"  @mariagestatus," 
      +"  @educationlevel," 
      +"  @occupation," 
      +"  @livehousenumber,"
      +"  @livemoonumber,"
      +"  @livevillagename,"
      +"  @livetumbon,"
      +"  @livecity,"
      +"  @liveprovince,"
      +"  @livepostcode,"
      +"  @carerstatus,"
      +"  @datetimeupdate)";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      console.log(res);
      callback(res.success);
    });
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE Family SET Title=@title, "
      +" FirstName = @firstname,"
      +" LastName = @lastname,"
      +" MariageStatus = @mariagestatus,"
      +" EducationLevel = @educationlevel,"
      +" Occupation = @occupation,"
      +" LiveHouseNumber = @livehousenumber,"
      +" LiveMooNumber = @livemoonumber,"
      +" LiveVillageName = @livevillagename,"
      +" LiveTumbon = @livetumbon,"
      +" LiveCity = @livecity,"
      +" LiveProvince = @liveprovince,"
      +" LivePostCode = @livepostcode,"
      +" CarerStatus = @carerstatus,"
      +" DateTimeUpdate = @datetimeupdate"
      +" WHERE " 
      +" CID = @cid";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res);
    });
  };
};

function OccupationModel() {
}

OccupationModel.list = function(SQL,callback) {
  console.log(SQL);
  var query_str = JSON.stringify({
   sql:'select * from Occpation' 
  });
  SQL.query({'query':query_str},callback);
};

function InsuranceCardModel() {
}

InsuranceCardModel.list = function(SQL,callback) {
  console.log(SQL);
  var query_str = JSON.stringify({
   sql:'select * from InsuranceCard' 
  });
  SQL.query({'query':query_str},callback);
};

function ExistingWelfareModel() {
  var self = this;
  this.json = null;
  
  this.table_name = function() {
    return "ExistingWelfare";
  }
  
  this.set = function(colName, val) {
    switch(colName) {
      case 'cid': index = 0; break;
      case 'insuranceCardID': index = 1; break;
      default:
        console.log('Not found '+colName);
        index=-1;
    };

    if(index!=-1) {
      for(var i=0;i<index;i++) {
        if(!self.json.cols[i]) { 
          self.json.cols[i] = {'value':undefined};
        }
      }
      self.json.cols[index] = {'value':val};
    }
  };
  
  this.assign_params = function() {
    var attrs = 10;
    for(var i=0;i<attrs;i++) {
      if(!self.json.cols[i]) {
        self.json.cols[i] = {value:undefined};
      }
    }

    var params = [
      {'name':'cid', 'type':'VarChar', 'value':self.json.cols[0].value},
      {'name':'insranceCardID', 'type':'VarChar', 'value':self.json.cols[1].value}
    ];
    return params;
  };

  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from ExistingWelfare' 
    });
    SQL.query({'query':query_str},callback);
  };


  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from ExistingWelfare where cid = "'+id+'"'
    });
    console.log(query_str);
    SQL.query({'query':query_str},function(res) {
      //console.log("-->"+res);
      if(res.rows.length==1) {
        self.json = res.rows[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  this.save = function(SQL,callback) {
    console.log('CID = '+self.json.cols[0].value);
    var query_str = JSON.stringify({
     sql:'select * from ExistingWelfare where cid = "'+
        self.json.cols[0].value+'" and insuranceCardID = "'+
        self.json.cols[1].value+'"'
    });
   
    SQL.query({'query':query_str},function(res) {
      if(res.rows.length==0) {
        self.insert(SQL, callback);
      } else {
        console.log('content updating');
        console.log(res);
        self.update(SQL, callback);
      }
    });
  };

  this.insert = function(SQL, callback) {
    var query = "INSERT INTO ExistingWelfare" 
      +" (CID,"
      +" InsuranceCardID)"
      +" VALUES " 
      +" (@cid," 
      +"  @insurancecardid)";
    //console.log(query);
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      console.log(res);
      callback(res.success);
    });
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE ExistingWelfare SET"
      +" InsuranceCardID=@insurancecardid "
      +" WHERE " 
      +" CID = @cid";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res);
    });
  };
};



function EducationChildModel() {
  var self = this;
  this.json = null;
  
  this.table_name = function() {
    return "EducationChild";
  }
  
  this.set = function(colName, val) {
    switch(colName) {
      case 'cid': index = 0; break;
      case 'educationstatusid': index = 1; break;
      default:
        console.log('Not found '+colName);
        index=-1;
    };

    if(index!=-1) {
      for(var i=0;i<index;i++) {
        if(!self.json.cols[i]) { 
          self.json.cols[i] = {'value':undefined};
        }
      }
      self.json.cols[index] = {'value':val};
    }
  };
  
  this.assign_params = function() {
    var attrs = 10;
    for(var i=0;i<attrs;i++) {
      if(!self.json.cols[i]) {
        self.json.cols[i] = {value:undefined};
      }
    }

    var params = [
      {'name':'cid', 'type':'VarChar', 'value':self.json.cols[0].value},
      {'name':'educationstatusid', 'type':'VarChar', 'value':self.json.cols[1].value}
    ];
    return params;
  };

  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from EducationChild' 
    });
    SQL.query({'query':query_str},callback);
  };


  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from EducationChild where cid = "'+id+'"'
    });
    console.log(query_str);
    SQL.query({'query':query_str},function(res) {
      //console.log("-->"+res);
      if(res.rows.length==1) {
        self.json = res.rows[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  this.save = function(SQL,callback) {
    console.log('CID = '+self.json.cols[0].value);
    var query_str = JSON.stringify({
     sql:'select * from EducationChild where cid = "'+
        self.json.cols[0].value+'" and educationstatusid = "'+
        self.json.cols[1].value+'"'
    });
   
    SQL.query({'query':query_str},function(res) {
      if(res.rows.length==0) {
        self.insert(SQL, callback);
      } else {
        console.log('content updating');
        console.log(res);
        self.update(SQL, callback);
      }
    });
  };

  this.insert = function(SQL, callback) {
    var query = "INSERT INTO EducationChild" 
      +" (CID,"
      +" EducationStatusID)"
      +" VALUES " 
      +" (@cid," 
      +"  @educationstatusid)";
    //console.log(query);
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      console.log(res);
      callback(res.success);
    });
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE EducationChild SET"
      +" EducationStatusID=@educationstatusid "
      +" WHERE " 
      +" CID = @cid";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res);
    });
  };
};

function EducationLevelCModel() {
}

EducationLevelCModel.list = function(SQL,callback) {
  console.log(SQL);
  var query_str = JSON.stringify({
   sql:'select * from EducationLevelC' 
  });
  SQL.query({'query':query_str},callback);
};


function WelfareCategoryModel() {
}

WelfareCategoryModel.list = function(SQL,cellback) {
  console.log(SQL);
  var query_str = JSON.stringify({
   sql:'select * from WelfareCategory' 
  });
  SQL.query({'query':query_str},callback);
};


function WelfareVSPersonModel() {
  var self = this;
  this.json = null;
  
  this.table_name = function() {
    return "WelfareVSPerson";
  }
  
  this.set = function(colName, val) {
    switch(colName) {
      case 'cid': index = 0; break;
      case 'welfareid': index = 1; break;
      default:
        console.log('Not found '+colName);
        index=-1;
    };

    if(index!=-1) {
      for(var i=0;i<index;i++) {
        if(!self.json.cols[i]) { 
          self.json.cols[i] = {'value':undefined};
        }
      }
      self.json.cols[index] = {'value':val};
    }
  };
  
  this.assign_params = function() {
    var attrs = 10;
    for(var i=0;i<attrs;i++) {
      if(!self.json.cols[i]) {
        self.json.cols[i] = {value:undefined};
      }
    }

    var params = [
      {'name':'cid', 'type':'VarChar', 'value':self.json.cols[0].value},
      {'name':'welfareid', 'type':'VarChar', 'value':self.json.cols[1].value}
    ];
    return params;
  };

  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from WelfareVSPerson' 
    });
    SQL.query({'query':query_str},callback);
  };


  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from WelfareVSPerson where cid = "'+id+'"'
    });
    console.log(query_str);
    SQL.query({'query':query_str},function(res) {
      //console.log("-->"+res);
      if(res.rows.length==1) {
        self.json = res.rows[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  this.save = function(SQL,callback) {
    console.log('CID = '+self.json.cols[0].value);
    var query_str = JSON.stringify({
     sql:'select * from WelfareVSPerson where cid = "'+
        self.json.cols[0].value+'" and welfareid = "'+
        self.json.cols[1].value+'"'
    });
   
    SQL.query({'query':query_str},function(res) {
      if(res.rows.length==0) {
        self.insert(SQL, callback);
      } else {
        console.log('content updating');
        console.log(res);
        self.update(SQL, callback);
      }
    });
  };

  this.insert = function(SQL, callback) {
    var query = "INSERT INTO WelfareVSPerson" 
      +" (CID,"
      +" WelfareID)"
      +" VALUES " 
      +" (@cid," 
      +"  @welfareid)";
    //eonsole.log(query);
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      console.log(res);
      callback(res.success);
    });
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE WelfareVSPerson SET"
      +" WelfareID=@welfareid "
      +" WHERE " 
      +" CID = @cid";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res);
    });
  };
};


function DisabilityTypeModel() {
}

DisabilityTypeModel.list = function(SQL,cellback) {
  console.log(SQL);
  var query_str = JSON.stringify({
   sql:'select * from DisabilityType' 
  });
  SQL.query({'query':query_str},callback);
};


function ServiceProvisionDetailModel() {
  var self = this;
  this.json = null;
  
  this.table_name = function() {
    return "ServiceProvisionDetail";
  }
  
  this.set = function(colName, val) {
    switch(colName) {
      case 'psnumber': index = 0; break;
      case 'actcode': index = 1; break;
      case 'cid': index = 4; break;
      default:
        console.log('Not found '+colName);
        index=-1;
    };

    if(index!=-1) {
      for(var i=0;i<index;i++) {
        if(!self.json.cols[i]) { 
          self.json.cols[i] = {'value':undefined};
        }
      }
      self.json.cols[index] = {'value':val};
    }
  };
  
  this.assign_params = function() {
    var attrs = 10;
    for(var i=0;i<attrs;i++) {
      if(!self.json.cols[i]) {
        self.json.cols[i] = {value:undefined};
      }
    }

    var params = [
      {'name':'psnumber', 'type':'VarChar', 'value':self.json.cols[0].value},
      {'name':'actcode', 'type':'VarChar', 'value':self.json.cols[1].value},
      {'name':'cid', 'type':'VarChar', 'value':self.json.cols[4].value}
    ];
    return params;
  };

  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from ServiceProvisionDetails' 
    });
    SQL.query({'query':query_str},callback);
  };


  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from ServiceProvisionDetails where cid = "'+id+'"'
    });
    console.log(query_str);
    SQL.query({'query':query_str},function(res) {
      //console.log("-->"+res);
      if(res.rows.length==1) {
        self.json = res.rows[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  this.save = function(SQL,callback) {
    console.log('CID = '+self.json.cols[0].value);
    var query_str = JSON.stringify({
     sql:'select * from ServiceProvisionDetails where cid = "'+
        self.json.cols[4].value+'" and actcode = "'+
        self.json.cols[1].value+'"'
    });
   
    SQL.query({'query':query_str},function(res) {
      if(res.rows.length==0) {
        self.insert(SQL, callback);
      } else {
        console.log('content updating');
        console.log(res);
        self.update(SQL, callback);
      }
    });
  };

  this.insert = function(SQL, callback) {
    var query = "INSERT INTO ServiceProvisionDetails" 
      +" (PSNumber,"
      +" ACTCode,"
      +" CID)"
      +" VALUES " 
      +" (@psnumber," 
      +"  @actcode,";
      +"  @cid)";
    //eonsole.log(query);
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      console.log(res);
      callback(res.success);
    });
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE ServiceProvisionDetails SET"
      +" PSNumber=@psnumber, "
      +" ACTCode=@actcode "
      +" WHERE " 
      +" CID = @cid";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res);
    });
  };
};

function DiseaseDataModel() {
}

DiseaseDataModel.list = function(SQL,cellback) {
  console.log(SQL);
  var query_str = JSON.stringify({
   sql:'select * from DiseaseData' 
  });
  SQL.query({'query':query_str},callback);
};


function ServiceProvisionModel() {
  var self = this;
  this.json = null;
  
  this.table_name = function() {
    return "ServiceProvision";
  }
  
  this.set = function(colName, val) {
    switch(colName) {
      case 'psnumber': index = 0; break;
      case 'hostid': index = 1; break;
      case 'psdatetime': index = 3; break;
      case 'caseno': index = 4; break;
      case 'cid': index = 5; break;
      default:
        console.log('Not found '+colName);
        index=-1;
    };

    if(index!=-1) {
      for(var i=0;i<index;i++) {
        if(!self.json.cols[i]) { 
          self.json.cols[i] = {'value':undefined};
        }
      }
      self.json.cols[index] = {'value':val};
    }
  };
  
  this.assign_params = function() {
    var attrs = 10;
    for(var i=0;i<attrs;i++) {
      if(!self.json.cols[i]) {
        self.json.cols[i] = {value:undefined};
      }
    }

    var params = [
      {'name':'psnumber', 'type':'VarChar', 'value':self.json.cols[0].value},
      {'name':'hostid', 'type':'VarChar', 'value':self.json.cols[1].value},
      {'name':'psdatetime', 'type':'VarChar', 'value':self.json.cols[3].value},
      {'name':'caseno', 'type':'VarChar', 'value':self.json.cols[4].value},
      {'name':'cid', 'type':'VarChar', 'value':self.json.cols[5].value}
    ];
    return params;
  };

  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from ServiceProvision' 
    });
    SQL.query({'query':query_str},callback);
  };


  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from ServiceProvision where cid = "'+id+'"'
    });
    console.log(query_str);
    SQL.query({'query':query_str},function(res) {
      //console.log("-->"+res);
      if(res.rows.length==1) {
        self.json = res.rows[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  this.save = function(SQL,callback) {
    console.log('CID = '+self.json.cols[0].value);
    var query_str = JSON.stringify({
     sql:'select * from ServiceProvision where cid = "'+
        self.json.cols[0].value+'" and hostid = "'+
        self.json.cols[1].value+'"'
    });
   
    SQL.query({'query':query_str},function(res) {
      if(res.rows.length==0) {
        self.insert(SQL, callback);
      } else {
        console.log('content updating');
        console.log(res);
        self.update(SQL, callback);
      }
    });
  };

  this.insert = function(SQL, callback) {
    var query = "INSERT INTO ServiceProvision" 
      +" (PSNumber,"
      +" HostID,"
      +" PSDateTime,"
      +" CaseNo,"
      +" CID)"
      +" VALUES " 
      +" (@psnumber," 
      +"  @hostid,";
      +"  @psdatetime,";
      +"  @caseno,";
      +"  @cid)";
    //eonsole.log(query);
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      console.log(res);
      callback(res.success);
    });
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE ServiceProvision SET"
      +" PSNumber=@psnumber, "
      +" HostID=@hostid,"
      +" PSDateTime=@psdatetime,"
      +" CaseNo=@caseno,"
      +" CID=@cid"
      +" WHERE " 
      +" CID = @cid";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res);
    });
  };
};


function MaterialTypeModel() {
}

MaterialTypeModel.list = function(SQL,cellback) {
  console.log(SQL);
  var query_str = JSON.stringify({
   sql:'select * from MaterialType' 
  });
  SQL.query({'query':query_str},callback);
};

function ActivityModel() {
}

ActivityModel.list = function(SQL,cellback) {
  console.log(SQL);
  var query_str = JSON.stringify({
   sql:'select * from Activity' 
  });
  SQL.query({'query':query_str},callback);
};


function TempHNModel() {
  var self = this;
  this.json = null;
  
  this.table_name = function() {
    return "Temp_HN";
  }
  
  this.set = function(colName, val) {
    switch(colName) {
      case 'HN': index = 0; break;
      case 'date': index = 1; break;
      case 'HostID': index = 2; break;
      case 'cid': index = 3; break;
      default:
        console.log('Not found '+colName);
        index=-1;
    };

    if(index!=-1) {
      for(var i=0;i<index;i++) {
        if(!self.json.cols[i]) { 
          self.json.cols[i] = {'value':undefined};
        }
      }
      self.json.cols[index] = {'value':val};
    }
  };
  
  this.assign_params = function() {
    var attrs = 10;
    for(var i=0;i<attrs;i++) {
      if(!self.json.cols[i]) {
        self.json.cols[i] = {value:undefined};
      }
    }

    var params = [
      {'name':'hn', 'type':'VarChar', 'value':self.json.cols[0].value},
      {'name':'date', 'type':'VarChar', 'value':self.json.cols[1].value},
      {'name':'hostid', 'type':'VarChar', 'value':self.json.cols[2].value},
      {'name':'cid', 'type':'VarChar', 'value':self.json.cols[3].value}
    ];
    return params;
  };

  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from Temp_HN' 
    });
    SQL.query({'query':query_str},callback);
  };


  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from Temp_HN  where cid = "'+id+'"'
    });
    console.log(query_str);
    SQL.query({'query':query_str},function(res) {
      //console.log("-->"+res);
      if(res.rows.length==1) {
        self.json = res.rows[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  this.save = function(SQL,callback) {
    console.log('CID = '+self.json.cols[0].value);
    var query_str = JSON.stringify({
     sql:'select * from Temp_HN where cid = "'+
        self.json.cols[0].value+'" and hostid = "'+
        self.json.cols[1].value+'"'
    });
   
    SQL.query({'query':query_str},function(res) {
      if(res.rows.length==0) {
        self.insert(SQL, callback);
      } else {
        console.log('content updating');
        console.log(res);
        self.update(SQL, callback);
      }
    });
  };

  this.insert = function(SQL, callback) {
    var query = "INSERT INTO Temp_HN" 
      +" (HN,"
      +" date,"
      +" HostID,"
      +" cid)"
      +" VALUES " 
      +" (@hn," 
      +"  @date,";
      +"  @hostid,";
      +"  @cid)";
    //eonsole.log(query);
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      console.log(res);
      callback(res.success);
    });
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE Temp_HN SET"
      +" HN=@hn, "
      +" date=@date,"
      +" HostID=@hostid,"
      +" cid=@cid"
      +" WHERE " 
      +" CID = @cid";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res);
    });
  };
};


function TempVacine01yearModel() {
  var self = this;
  this.json = null;
  
  this.table_name = function() {
    return "Temp_Vacine0-1year";
  }
  
  this.set = function(colName, val) {
    switch(colName) {
      case 'number': index = 0; break;
      case 'HN': index = 1; break;
      case 'CID': index = 2; break;
      case 'name': index = 3; break;
      case 'age_year': index = 4; break;
      case 'age_month': index = 5; break;
      case 'bcg': index = 6; break;
      case 'hbv1': index = 7; break;
      case 'hbv2': index = 8; break;
      case 'hbv3': index = 9; break;
      case 'dtp1': index = 10; break;
      case 'dtp2': index = 11; break;
      case 'dtp3': index = 12; break;
      case 'opv1': index = 13; break;
      case 'opv2': index = 14; break;
      case 'opv3': index = 15; break;
      case 'measle_mmr': index = 16; break;
      case 'dtphb1': index = 17; break;
      case 'dtphb2': index = 18; break;
      case 'dtphb3': index = 19; break;
      case 'address': index = 20; break;
      case 'moo': index = 21; break;
      case 'villagename': index = 22; break;
      default:
        console.log('Not found '+colName);
        index=-1;
    };

    if(index!=-1) {
      for(var i=0;i<index;i++) {
        if(!self.json.cols[i]) { 
          self.json.cols[i] = {'value':undefined};
        }
      }
      self.json.cols[index] = {'value':val};
    }
  };
  
  this.assign_params = function() {
    var attrs = 10;
    for(var i=0;i<attrs;i++) {
      if(!self.json.cols[i]) {
        self.json.cols[i] = {value:undefined};
      }
    }

    var params = [
      {'name':'number', 'type':'VarChar', 'value':self.json.cols[0].value},
      {'name':'hn', 'type':'VarChar', 'value':self.json.cols[1].value},
      {'name':'cid', 'type':'VarChar', 'value':self.json.cols[2].value},
      {'name':'name', 'type':'VarChar', 'value':self.json.cols[3].value},
      {'name':'age_year', 'type':'VarChar', 'value':self.json.cols[4].value},
      {'name':'age_month', 'type':'VarChar', 'value':self.json.cols[5].value},
      {'name':'bcg', 'type':'VarChar', 'value':self.json.cols[6].value},
      {'name':'hbv1', 'type':'VarChar', 'value':self.json.cols[7].value},
      {'name':'hbv2', 'type':'VarChar', 'value':self.json.cols[8].value},
      {'name':'hbv3', 'type':'VarChar', 'value':self.json.cols[9].value},
      {'name':'dtp1', 'type':'VarChar', 'value':self.json.cols[10].value},
      {'name':'dtp2', 'type':'VarChar', 'value':self.json.cols[11].value},
      {'name':'dtp3', 'type':'VarChar', 'value':self.json.cols[12].value},
      {'name':'opv1', 'type':'VarChar', 'value':self.json.cols[13].value},
      {'name':'opv2', 'type':'VarChar', 'value':self.json.cols[14].value},
      {'name':'opv3', 'type':'VarChar', 'value':self.json.cols[15].value},
      {'name':'measle_mmr', 'type':'VarChar', 'value':self.json.cols[16].value},
      {'name':'dtphb1', 'type':'VarChar', 'value':self.json.cols[17].value},
      {'name':'dtphb2', 'type':'VarChar', 'value':self.json.cols[18].value},
      {'name':'dtphb3', 'type':'VarChar', 'value':self.json.cols[19].value},
      {'name':'address', 'type':'VarChar', 'value':self.json.cols[20].value},
      {'name':'moo', 'type':'VarChar', 'value':self.json.cols[21].value},
      {'name':'villagename', 'type':'VarChar', 'value':self.json.cols[22].value}
    ];
    return params;
  };

  this.list = function(SQL,callback) { 
    var query_str = JSON.stringify({
     sql:'select * from Temp_Vacine0-1year' 
    });
    SQL.query({'query':query_str},callback);
  };


  this.get = function(SQL, id, callback) { 
    var query_str = JSON.stringify({
     sql:'select * from Temp_Vacine0-1year where cid = "'+id+'"'
    });
    console.log(query_str);
    SQL.query({'query':query_str},function(res) {
      //console.log("-->"+res);
      if(res.rows.length==1) {
        self.json = res.rows[0];
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  this.save = function(SQL,callback) {
    console.log('CID = '+self.json.cols[0].value);
    var query_str = JSON.stringify({
     sql:'select * from Temp_Vacine0-1year where cid = "'+
        self.json.cols[4].value+'" and actcode = "'+
        self.json.cols[1].value+'"'
    });
   
    SQL.query({'query':query_str},function(res) {
      if(res.rows.length==0) {
        self.insert(SQL, callback);
      } else {
        console.log('content updating');
        console.log(res);
        self.update(SQL, callback);
      }
    });
  };

  this.insert = function(SQL, callback) {
    var query = "INSERT INTO Temp_Vacine0-1year" 
      +" (number,"
      +" HN,"
      +" CID,"
      +" name,"
      +" age_year,"
      +" age_month,"
      +" BCG,"
      +" HBV1,"
      +" HBV2,"
      +" HBV3,"
      +" DTP1,"
      +" DTP2,"
      +" DTP3,"
      +" OPV1,"
      +" OPV2,"
      +" OPV3,"
      +" MeasleMMR,"
      +" DTPHB1,"
      +" DTPHB2,"
      +" DTPHB3,"
      +" address,"
      +" moo,"
      +" villagename)"
      +" VALUES " 
      +" (@number," 
      +"  @hn,";
      +"  @cid,";
      +"  @name,";
      +"  @age_year,";
      +"  @age_month,";
      +"  @bcg,";
      +"  @hbv1,";
      +"  @hbv2,";
      +"  @hbv3,";
      +"  @dtp1,";
      +"  @dtp2,";
      +"  @dtp3,";
      +"  @opv1,";
      +"  @opv2,";
      +"  @opv3,";
      +"  @measle_mmr,";
      +"  @dtphb1,";
      +"  @dtphb2,";
      +"  @dtphb3,";
      +"  @address,";
      +"  @moo,";
      +"  @villagename)";
    //eonsole.log(query);
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      console.log(res);
      callback(res.success);
    });
  };

  this.update = function(SQL, callback) {
    var query = "UPDATE Temp_Vacine0-1year SET"
      +" number=@number, "
      +" HN=@hn, "
      +" CID=@cid, "
      +" name=@name, "
      +" age_year=@age_year, "
      +" age_month=@age_month, "
      +" BCG=@bcg, "
      +" HBV1=@hbv1, "
      +" HBV2=@hbv2, "
      +" HBV3=@hbv3, "
      +" DTP1=@dtp1, "
      +" DTP2=@dtp2, "
      +" DTP3=@dtp3, "
      +" OPV1=@opv1, "
      +" OPV2=@opv2, "
      +" OPV3=@opv3, "
      +" MeasleMMR=@measle_mmr, "
      +" DTPHB1=@dtphb1, "
      +" DTPHB2=@dtphb2, "
      +" DTPHB3=@dtphb3, "
      +" address=@address, "
      +" moo=@moo, "
      +" villagename=@villagename"
      +" WHERE " 
      +" CID = @cid";
    var params = self.assign_params();
    SQL.get({'query':JSON.stringify({'sql':query, 'params':params})}, 
      function(res) {
      callback(res);
    });
  };
};


