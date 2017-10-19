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
	    // console.log('submit:',req.body); 
	    // if(req.body.username=='admin' && req.body.password=='asd') 


	    var user=getUserFromToken(req);
		var tmp=Object.assign({
			user_id:user.id,
			_id: new ObjectID(user.id+(new Date().getTime())).toHexString() //TODO!!!!
		},req.body);

		// console.log(new ObjectID().toHexString(),tmp);
        db.then((db)=>{
			db.collection('sensors').insertOne(tmp,(err,data)=>{
				if(err) res.sendStatus(500);
				else
					res.json(data);
			});
		}).catch((err)=>{
			res.sendStatus(500);
		});
	    // else 
	        // res.status(500).send('Błąd'); 
	})   
};