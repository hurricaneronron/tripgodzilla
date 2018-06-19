
const router = require("express").Router();
const nationalcontroller = require("../../controllers/nationalController");


router.route("/")
  .get(nationalcontroller.findAll)
  .post(nationalcontroller.create);



  

module.exports = router;



// var express = require('express');
// var router = express.Router();
// var mongojs = require('mongojs');
// var db = mongojs('mongodb://localhost:27017/Historical', ['national']);
 
// // Get All todos
// router.get('/national', function(req, res, next){
//     db.national.find(function(err, todos){
//         if(err){
//             res.send(err);
//         }
//         res.json(todos);
//     });
// });


// module.exports = router;

