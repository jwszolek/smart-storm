/** 
//  * Created by MD on 17/10/17. 
//  */ 

var utils=require('../../../utils');
var bcrypt = require('bcryptjs');


module.exports = function(r){
	r.post('/', (req,res)=>{ 
		var newUser={
			email:req.body.email,
			password:req.body.password
		};

		utils.getDbConnection().then((db)=>{

		 	db.collection('users').findOne({
		 		email:newUser.email	
		 	},(err,user)=>{
		 		if(err){
		 			console.log('Error getting users list:'+err);
					res.sendStatus(500);
					db.close();
		 		}
		 		else if(!user){

		 			bcrypt.hash(newUser.password, 10, (err, hash) => {
		 				if(err){
				 			console.log('Error hashing password:'+err);
							res.sendStatus(500);
							db.close();
				 		}else{
				 			newUser.hash=hash;
				 			delete newUser.password; //!!!

				 			db.collection('users').insertOne(newUser,(err,data)=>{
								if(err) { 
									console.log('Error adding new user:'+err);
									res.sendStatus(500);
								}
								else
									res.json(data);
								db.close();
							});
				 		}
		 			});

		 			
		 		}else{
		 			res.sendStatus(400);
		 		}
		 	});

		}).catch((err)=>{
			console.log('Error connecting to: '+url);
			res.sendStatus(500);
		});

	});   
};