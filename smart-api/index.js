'use strict';

var express = require('express');
var kraken = require('kraken-js');
var basicAuth = require('express-basic-auth');
var cors = require('cors'); 
var expressJwt = require('express-jwt');

var addFunc=require('./addFunc');

var options, app;
// var mongo = require('mongodb');
/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        next(null, config);
    }
};



app = module.exports = express();
app.use(kraken(options));


app.use(cors({ 
  origin:'http://localhost:4300' 
})); 

//app.use(basicAuth({users: { 'admin': 'supersecret'}}));
app.use('/api/*',expressJwt({
    secret: addFunc.getSecret,
    getToken: addFunc.getToken,
    // isRevoked: function(req,payload,done){

    // }
}).unless({ path: ['/api/users/authenticate','/api/users/register'] }));

app.use(function (err, req, res, next) {
  // if (err.name === 'UnauthorizedError') {
  //   // res.status(401).send('invalid token...');
  //   res.sendStatus(401);
  // }
  console.log(req.ip+' - ['+new Date().toUTCString()+'] '+err.name+' - '+req.headers.host+' - "'+req.method+' '+req.originalUrl+'" - "'+ req.headers["user-agent"]+'"');
  res.sendStatus(err.status);
});


app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
