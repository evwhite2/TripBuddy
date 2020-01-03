var express = require("express");
var exphbs = require("express-handlebars");
var app = express();

var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./app/models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("./app/public"));

//handleabars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes

//// I am having issue exporting these routes, need some help, not sure why it isn't working

// var router = require("./app/routes/html-routes");
// app.use(router)
var db= require("./app/models"); 

  app.get("/", (req, res)=>{
      res.render('index')
    });

  app.get("/users", function(req, res) {
      res.render('users')
    });

  // blog route loads blog.html
  app.get("/trips", function(req, res) {      
    res.render('trips')
    });

  // authors route loads author-manager.html
  app.get("/interest", function(req, res) {
    res.render('interest')
    });

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
