
var db= require("../models"); 
var express = require("express");
var router = express.Router();

var usersAPI = require("./users-api");
var tripsAPI = require("./trips-api");
var stopsAPI = require("./stops-api");

  router.get("/", (req, res)=>{
      res.render('index')
  });

  router.get("/users", function(req, res) {
    db.User.findAll({}).then(function(data){
      var userData= { user : data };
      res.render('users', userData)
    })
  });
  
  router.use(usersAPI);

  router.get("/trips", function(req, res) {      
    res.render('trips')
  });

  router.use(tripsAPI);
  
  router.get("/stops", function(req, res) {
    res.render('interests')
  });
  
  router.use(stopsAPI);
    

module.exports = router