/** 
//  * Created by MD on 17/10/17. 
//  */ 
// // var express = require('express'); 
 
// // var routes = function () { 
 
//     var userRouter = express.Router(); 
     
//     userRouter 
//         .post("/",function (req,res) { 
//             // console.log(req); 
//             if(req.body.username=='admin' && req.body.password=='asd') 
//                 res.json({ 
//                   user:'OK', 
//                 }) 
//             else 
//                 res.status(500).send('Błąd'); 
//         }) 
     
//   userRouter.post('/', (req,res)=>{ 
//     // console.log(req); 
//     res.json({ 
//       user:'OK', 
//     }) 
//   });   
 
// } 
 
module.exports = function(r){
  r.post('/', (req,res)=>{ 
    // console.log(req); 
    res.json({ 
      user:'OK', 
    }) 
  });   
};