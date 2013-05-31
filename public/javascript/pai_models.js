function PHPModel() {
}

PHPModel.list_all = function(PHPMyadmin, table_name, cb) {
  var sql_query = 'select * from '+table_name;
  var rows = 0;
   
  var get_rows = {'sql':'select count(*) from '+table_name};
  PHPMyadmin.query(get_rows, function(result) {
    console.log(result);
  });
}

function PaiTitleModel(){
  var self = this;
  this.json = null;

}

PaiTitleModel.list_all = function(PHPMyadmin,callback) {
  var sql_str = {'sql':'select * from alldata.co_title limit 0, 100'};
  PHPMyadmin.query(sql_str, callback);
}

function PAIMapping() {

}


PAIMapping.map1 = function(config, callback) { 
  var SQL = config.sql;
  PaiTitleModel.list_all(config, function(ptitle_list) {
    console.log(ptitle_list); 
    TitleModel.list(config, function(title_list) {
      console.log(title_list);   
      angular.forEach(ptitle_list, function(row) {
        console.log(row);    
      });
    });
  });
}

