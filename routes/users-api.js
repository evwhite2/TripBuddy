var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/all-users", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Users.findAll({}).then(function(allusers) {
      // We have access to the users as an argument inside of the callback function
      res.json(allusers);
    });
  });
}
