var db = require("../app/models");

module.exports = function(app){
  
    app.get("/api/stops", function(req, res) {
    db.Stops.findAll({}).then(function(allstops) {
      res.json(allstops);
    });
  });
 
  app.post("/api/stops", (req, res)=>{

  });

  app.delete("/api/stops", (req, res)=>{

  });

};

