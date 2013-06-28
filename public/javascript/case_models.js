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
      case 'livecity': index = 19; break;
      case 'liveprovince': index = 20; break;
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
    var attrs = 30;
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
      {'name':'livecity', 'type':'VarChar', 'value':self.json.cols[19].value},
      {'name':'liveprovince', 'type':'VarChar', 'value':self.json.cols[20].value}
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
      +" LiveCity,"
      +" LiveProvince)"
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
      +"  @livecity,"
      +"  @liveprovince)";
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
      +" LiveCity = @livecity,"
      +" LiveProvince = @liveprovince"
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
  
