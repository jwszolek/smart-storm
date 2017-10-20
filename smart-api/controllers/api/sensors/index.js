var utils=require('../../../utils');

module.exports = function(r){
  r.get("/",function (req,res) { 
        var user=getUserFromToken(req);
		var db=utils.getDbConnection().then((db)=>{
			
			db.collection('sensors').find({user_id:user.id}).toArray((err,data)=>{
				if(err) { 
					console.log('Error getting sensor list:'+err);
					res.sendStatus(500);
				}
				else res.json(data);
				db.close();
			});
			
		}).catch((err)=>{
			console.log('Error connecting to: '+url);
			res.sendStatus(500);
		});
    })   
};