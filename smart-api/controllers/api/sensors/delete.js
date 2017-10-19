var MongoClient = require('mongodb').MongoClient,
	ObjectID = require('mongodb').ObjectID;

var url = "mongodb://localhost:27017/storm-db";

var db=MongoClient.connect(url).then((db)=>{
	// console.log(err,db);
	if(db) console.log("Connected to: "+url);
	else console.log('Error connecting to: '+url);

	return db;
});


module.exports = function(r){
  	r.post("/",function (req,res) { 
	    // console.log('update:',req.body); 
	    // if(req.body.username=='admin' && req.body.password=='asd') 


	    var user=getUserFromToken(req);

	    var copy=Object.assign({},req.body);

		var _check=Object.assign({},req.body);
		delete _check.name;
		delete _check._$visited;
		
		console.log(_check);
		if(_check.user_id==user.id) //overwrite with USER_ID from token!

		// console.log(new ObjectID().toHexString(),tmp);
	        db.then((db)=>{
				db.collection('sensors').deleteOne(_check,(err,data)=>{
					if(err) res.sendStatus(500);
					else
						res.json(data);
				});

			}).catch((err)=>{
				res.sendStatus(500);
			});
	    else 
	        res.status(500).send('Błąd'); 
	})   
};