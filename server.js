var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
const session = require("express-session");
const path = require("path");

var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

//handleabars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
var routes = require("./routes/html-routes");
app.use(routes);

//set up session so can stay logged in
app.use(session(
  {
    secret: "tripBuddy_db",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60* 1000 * 30
    }
  }
));

//error handling
app.use((err, req, res, next)=> {
  res.status(err.status || 500);
  res.send(err.message);
});

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
