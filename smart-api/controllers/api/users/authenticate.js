/** 
 * Created by MD on 17/10/17. 
 */ 
var utils=require('../../../utils');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

 module.exports = function(r){
  	r.post("/",function (req,res) { 
            // console.log(req); 
            // if(req.body.username=='admin' && req.body.password=='asd') 
		var theUser={
			email:req.body.email,
			password:req.body.password
		};
        utils.getDbConnection().then((db)=>{

		 	db.collection('users').findOne({
		 		email:theUser.email	
		 	},(err,user)=>{
		 		if(err){
		 			console.log('Error getting users list:'+err);
					res.sendStatus(500);
					db.close();
		 		}
		 		else if(user){

		 			bcrypt.compare(theUser.password, user.hash, (err, auth) => {
		 				if(err){
				 			console.log('Error unhashing password:'+err);
							res.sendStatus(500);
							db.close();
				 		}else if (auth){
				 			res.json({ 
			                  user: user.email,
			                  token: utils.generateToken(user)
			                });

				 		}else{
				 			console.log('Bad password:' +theUser.password);
				 			res.sendStatus(403);
				 		}
						db.close();
		 			});

		 			
		 		}else{
		 			console.log('Bad user:' +theUser.email);
		 			res.sendStatus(403);
					db.close();
		 		}
		 	});

		}).catch((err)=>{
			console.log('Error connecting to: '+url);
			res.sendStatus(500);
		}); 
    });   
};