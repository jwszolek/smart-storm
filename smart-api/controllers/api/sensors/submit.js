
var	ObjectID = require('mongodb').ObjectID;

var utils=require('../../../utils');


module.exports = function(r){
  	r.post("/",function (req,res) { 


	    var user=getUserFromToken(req);
		var tmp=Object.assign({
			user_id:user.id,
			_id: new ObjectID() //TODO!!!!
		},req.body);

		var db=utils.getDbConnection().then((db)=>{
		 	// console.log("Connected to: "+url);
			db.collection('sensors').insertOne(tmp,(err,data)=>{
				if(err) { 
					console.log('Error getting sensor list:'+err);
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
	})   
};