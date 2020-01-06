var db = require("../models");
var express = require("express");
var router = express.Router();

  router.get("/api/trips", function(req, res) {
    db.Trip.findAll({}).then(function(alltrips) {
      res.json(alltrips);
    });
  });

  router.post("/api/trips", (req, res)=>{

  });
  
  router.delete("/api/trips", (req, res)=>{

  });


  module.exports = router;
