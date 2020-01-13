
var db= require("../models"); 
var express = require("express");
var router = express.Router();
const app = express();

var usersAPI = require("./users-api");
var tripsAPI = require("./trips-api");
var stopsAPI = require("./stops-api");


router.get("/savedTrips", function(req, res) {
        db.Trip.findAll({}).then(function(data){
          tripData = {trip : data}
          res.render('savedTrips', tripData)
        })
  
  });


router.get("/trips", function(req, res) {      
  res.render('trips')
  });

  router.use(tripsAPI);
  
  router.get("/interests", function(req, res) {
    res.render('interests')
  });
  
  //set up a home page or dashboard specific to user - can show saved 'trips' from there
  router.get("/home", function(req, res) {
    res.render('home');
  })

  router.use(stopsAPI);
    

module.exports = router