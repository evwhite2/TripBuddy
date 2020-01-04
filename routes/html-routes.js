
var db= require("../models"); 
var express = require("express");
var router = express.Router();

  router.get("/", (req, res)=>{
      res.render('index')
      console.log("testing inside index");
    });

  router.get("/users", function(req, res) {
      res.render('users')
    });

  router.get("/trips", function(req, res) {      
    res.render('trips')
    });

  router.get("/interest", function(req, res) {
    res.render('interest')
    });
    

module.exports = router