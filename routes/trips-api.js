var db = require("../app/models");

module.exports = function(app) {

  app.get("/api/trips", function(req, res) {
    db.Stops.findAll({}).then(function(allstops) {
      res.json(alltrips);
    });
  });

  app.post("/api/trips", (req, res)=>{

  });
  
  app.delete("/api/trips", (req, res)=>{

  });

}
