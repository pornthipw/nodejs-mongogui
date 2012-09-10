exports.viewDatabase = function(req, res) {
  var colls = null;
  for(var obj in req.collections) {
      // console.log('viewDatabase '+ req.collections[obj]);      
      if(req.collections[obj].db_name == req.dbName) {
        colls = req.collections[obj];
        break;
      } 
  }
  var ctx = {    
    collections: colls
  };
  res.json(ctx);
}
