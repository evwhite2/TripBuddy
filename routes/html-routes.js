module.exports = function(app) {

    db= require("../models");
 
  app.get("/", function(req, res) {
    return res.render("")
    });

  app.get("/users", function(req, res) {
    
    });

  // blog route loads blog.html
  app.get("/trips", function(req, res) {
    
    });

  // authors route loads author-manager.html
  app.get("/authors", function(req, res) {
  
    });

};
