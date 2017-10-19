

var jwt = require('jsonwebtoken');

getSecret=function(req,payload,done){
	var secret='SUPER_SECRET'
	if(done)
		done(null,secret);
	else
		return secret;
};

getToken=function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    };

getUserFromToken=function(req){
	var token=getToken(req);
	return jwt.verify(token,getSecret({},{})); //PROMISE!!!
}

module.exports={
	getToken:getToken,
	getSecret:getSecret,
}