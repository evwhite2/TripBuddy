var db = require("../models");
var express = require("express");
var router = express.Router();

//generate user specific info
const userContent = { userName: '', firstName: '', loggedin: false, body: 'foo'}


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
      UserId: req.session.user.id,
    }).then(newTrip=>{
      res.send("Trip Saved: "+ newTrip.tripName)
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
        //auto refresh is not working, manual refresh does, however
        location("/trip").reload();
        res.end()
      })
  });


  module.exports = router;
