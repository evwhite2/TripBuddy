
var db= require("../models"); 
var express = require("express");
var router = express.Router();

var usersAPI = require("./users-api");
var tripsAPI = require("./trips-api");
var stopsAPI = require("./stops-api");

const userContent = { userName: '', firstName: '', loggedin: false, body: 'foo'}


router.get("/trips", function(req, res) { 
  
  if (req.session.user && req.cookies.user_sid) {
		userContent.loggedin = true; 
    userContent.userName = req.session.user.userName; 
    userContent.firstName = req.session.user.firstName;
		userContent.title = "You are logged in"; 

        db.User.findOne({ where: { id: req.session.user.id, include: [db.Trip] } }).then(function(data){
            var userData= { user : data };
            res.render('trips', userData);
          })
        res.render('trips', userContent);
    } else {
        res.redirect('/login');
    }
  });

 
  router.get("/savedTrips", function(req, res) {
    if (req.session.user && req.cookies.user_sid) {
      userContent.loggedin = true; 
      userContent.userName = req.session.user.userName; 
      userContent.firstName = req.session.user.firstName;
      userContent.title = "You are logged in"; 


      db.Trip.findAll({
        where:{
          UserId: req.session.user.id
        }
      }).then(function(data){
        tripData = {trip : data}
        console.log("data!!!", data) //this is still not rendering all navigation tabs when user is logged in
        res.render('savedTrips', tripData)
      })
  
    }else{
      res.redirect('/login');
    }
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