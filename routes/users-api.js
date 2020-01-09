var db = require("../models");
var express = require("express");
var router = express.Router();

var query = {};

router.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(allusers) {
      res.json(allusers);
      });
    });

router.post("/api/users", (req, res)=>{
    console.log("new user: "+ req.body);

    db.User.create({
      firstName : req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email
      //should include validation for email and username
    }).then(function(newUser){
      res.json(newUser);
      console.log("added!: "+ newUser)
      res.end();
    })

  });

router.delete("/api/users/:id", (req, res)=>{
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then((res)=> {
      res.json(res);
    })
    });


  module.exports = router