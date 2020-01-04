var db = require("../app/models");

module.exports = function(app) {
    app.get("/api/users", function(req, res) {
        db.Users.findAll({}).then(function(allusers) {
          res.json(allusers);
        });
      });

    app.post("/api/users", (req, res)=>{

    });

    app.delete("/api/users", (req, res)=>{

    });

    
};