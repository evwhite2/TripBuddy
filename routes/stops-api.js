var db = require("../models");
var express = require("express");
var router = express.Router();
  
  router.get("/api/stops", function(req, res) {
    db.Stop.findAll({}).then(function(allstops) {
      res.json(allstops);
    });
  });
 
  router.post("/api/stops", (req, res)=>{
    db.Stop.create({
      stopName : req.body.stopName,
      tripID : req.body.tripID
    }).then(function(newStop){
      res.json(newStop);
      res.end();
    })
      console.log("new stop added")
  });

  router.delete("/api/stops", (req, res)=>{

  });

  module.exports = router;

