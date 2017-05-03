/**
 * Created by kubaw on 04/05/17.
 */
var express = require('express');

var routes = function () {

    var measureRouter = express.Router();
    
    measureRouter.route("/Test")
        .get(function (req,res) {
            res.json('Test')
        })
    

}

module.exports = routes;