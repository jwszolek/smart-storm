
var utils=require('../../../utils');
var	ObjectID = require('mongodb').ObjectID;

module.exports = function(r){
  	r.post("/",function (req,res) { 
	    // console.log('update:',req.body); 
	    // if(req.body.username=='admin' && req.body.password=='asd') 


	    var user=getUserFromToken(req);

	    var copy=Object.assign({},req.body);
		delete copy._$visited;
		
		var _check=Object.assign({},req.body);
		delete _check.name;
		delete _check._$visited;

		if(_check.user_id==user.id){ 

			var db=utils.getDbConnection().then((db)=>{
			 	// console.log("Connected to: "+url);
				
				_check._id=ObjectID.createFromHexString(_check._id);
				copy._id=ObjectID.createFromHexString(copy._id);
				db.collection('sensors').updateOne(_check,copy,(err,data)=>{
					if(err) { 
						console.log('Error updating sensor:'+err);
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
			console.log('Ids mismatched! Token:'+user.id+' - Request:' +_check.user_id);
			res.sendStatus(403);
		}
	})   
};