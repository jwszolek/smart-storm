
var express = require('express');
var basicAuth = require('express-basic-auth');
var bodyParser = require('body-parser');

var app = express();
var port = 8889;

measureRouter = require('./Routes/measurementRoutes')();

app.use(basicAuth({users: { 'admin': 'supersecret'}}));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/api/v1/measurement", measureRouter);

app.listen(port, function(){
	console.log("I am running on PORT !!: " + port);
})