var db = require("../models");
var express = require("express");
var router = express.Router();
var app = express();

// var user = "";

  router.get("/api/trips", function(req, res) {
    db.Trip.findAll({}).then(function(alltrips) {
      res.json(alltrips);
    });
  });

  router.post("/api/trips", (req, res)=>{
    db.Trip.create({
      tripName: req.body.tripName,
      startPt: req.body.startPt,
      midPt: req.body.midPt,
      endPt: req.body.endPt,
      UserId: "1"
    }).then(newTrip=>{
      res.json(newTrip);
      res.end();
    }).catch(function(err){
        console.log("error:", err)
    })
  });
  

  router.delete("/api/trips/:id", (req, res)=>{
    db.Trip.destroy({
      where:{
        id: req.params.id
      }
    }).then((err, res)=>{
        if(err) throw err;
        
    })
    location.reload();
  });


  module.exports = router;
