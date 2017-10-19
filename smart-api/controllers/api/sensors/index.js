var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/storm-db";

var db=MongoClient.connect(url).then((db)=>{
	// console.log(err,db);
	if(db) console.log("Connected to: "+url);
	else console.log('Error connecting to: '+url);

	return db;
});

module.exports = function(r){
  r.get("/",function (req,res) { 
        // console.log(req); 
        // if(req.body.username=='admin' && req.body.password=='asd') 
        var user=getUserFromToken(req);
        // console.log(user);

        db.then((db)=>{
			db.collection('sensors').find({user_id:user.id}).toArray((err,data)=>{
				res.json(data);
			});
		}).catch((err)=>{
			res.sendStatus(500);
		});

     //    tmp=[{
     //    	name:'ABC',
     //    	date: new Date(),
     //    	id:'KJH-BAU126-4t3'
    	// }];
     //    res.send(tmp);
        // else 
            // res.status(500).send('Błąd'); 
    })   
};