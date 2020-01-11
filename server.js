var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");


var PORT = process.env.PORT || 8080;

// const sequelize = new Sequelize('tripBuddy_db', 'root', 'YOURPASS', {
//   host: 'localhost',
//   port: PORT,
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

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

//store cookies in browser
app.use(cookieParser());

//cookie depends on browser -- if server restarts/stops, browser stores user info if user is logged in
app.use((req, res, next) => {
  if(req.cookies.user && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

//set up session so can stay logged in
app.use(session(
  {
    key: 'user_sid',
    secret: "tripBuddy_db",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60* 1000 * 30
    }
  }
));

//session checker
const sessionChecker = (req, res, next) => {
  if(req.session.user && req.cookies.user_sid) {
    res.redirect('/home')     //set up home route to welcome user
  } else {
    next();
  }
};

app.get('/', sessionChecker, (req, res)=> {
  res.render('index');
})

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
