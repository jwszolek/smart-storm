
var utils=require('../../../utils');
var	ObjectID = require('mongodb').ObjectID;

module.exports = function(r){
  	r.post("/",function (req,res) { 

	    var user=getUserFromToken(req);


		var _check=Object.assign({},req.body);
		delete _check._$visited;
		

		if(_check.user_id==user.id){ 

			var db=utils.getDbConnection().then((db)=>{

				_check._id=ObjectID.createFromHexString(_check._id);
				
				db.collection('sensors').deleteOne(_check,(err,data)=>{
					if(err){ 
						console.log('Error deleting sensor:'+err);
						res.sendStatus(500);
					}
					else
						res.json(data);
					db.close();
				});
				
			}).catch((err)=>{
				console.log('Error connecting to: '+url);
				res.sendStatus(500);
			});
		}else {
			console.log('Ids mismatched! Token:'+user.id+'- Request:' +_check.user_id);
			res.sendStatus(403);
		}
	})   
};