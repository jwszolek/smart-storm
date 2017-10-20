/**
 * Created by jwszol on 11/10/2017.
 */

'use strict';

module.exports = function (router) {
    // notice that my route is '/' but I respond to '/measures'
    router.get('/', function (req, res) {
        res.send('you can find me at /sensor');
    });

    router.post('/add', function (req, res) {
        /*
            UserID
            SensorID

         */

        res.send('you can find me at /sensor/add');
    });




};
