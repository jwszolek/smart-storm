/**
 * Created by jwszol on 29/07/17.
 */


'use strict';

module.exports = function (router) {
    // notice that my route is '/' but I respond to '/measures'
    router.get('/', function (req, res) {
        res.send('you can find me at /measure');
    });

    router.post('/send', function (req, res) {

        // send measure to Kafka
        res.send('you can find me at /measure/send');


    });
};
