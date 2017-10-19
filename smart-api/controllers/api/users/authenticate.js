/** 
 * Created by MD on 17/10/17. 
 */ 
// var express = require('express'); 
 
// // var routes = function () { 
 
//     var userRouter = express.Router(); 
     
//     userRouter 
//         .post("/authenticate",function (req,res) { 
//             // console.log(req); 
//             if(req.body.username=='admin' && req.body.password=='asd') 
//                 res.json({ 
//                   user:'OK', 
//                 }) 
//             else 
//                 res.status(500).send('Błąd'); 
//         }) 
     
//   userRouter.post('/register', (req,res)=>{ 
//     // console.log(req); 
//     res.json({ 
//       user:'OK', 
//     }) 
//   });   
 
// } 
var jwt = require('jsonwebtoken');
// var bcrypt = require('bcryptjs');

 module.exports = function(r){
  r.post("/",function (req,res) { 
            // console.log(req); 
            if(req.body.username=='admin' && req.body.password=='asd') 
                res.json({ 
                  user:'OK',
                  token:jwt.sign({
                            sub: req.body.username,
                            id: 325,
                            permissions: {
                            	sensors:'write'
                            },
                        }, 'SUPER_SECRET', {
                            expiresIn:  15*60
                        })
                }) 
            else 
                res.status(500).send('Błąd'); 
        })   
};