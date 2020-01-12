//Packages to install:
//npm i cookie-parser express-session morgan express-handlebars body-parser express path sequelize mysql mysql2 bcrypt
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

//local files
const sequelize = require("./config/database");
const db = require("./models");
const userRoutes = require("./routes/users-api");
const tripRoutes = require("./routes/trips-api");


// invoke an instance of express application.
var app = express();

// set our application port
app.set('port', 8080);

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'tripBuddy_db',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// Static directory
app.use(express.static("public"));

// handle bars config
app.engine('hbs', hbs({extname: 'hbs',defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'})); 
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'hbs'); 
// This middleware will check if user's cookie is still saved in browser 
//and user is not set, then automatically log the user out.
// cookie remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});


//dynamic user content
var userContent = {userName: '', loggedin: false, title: "You are not logged in today", body: "Hello World", }; 

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
		
        res.redirect('/dashboard');
    } else {
        next();
    }    
};


// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});

// api Routes
app.use(userRoutes);
app.use(tripRoutes)


// route for user signup
app.route('/signup')
    //.get(sessionChecker, (req, res) => {
    .get((req, res) => {
        //res.sendFile(__dirname + '/public/signup.html');
        db.User.findAll({}).then(function(data){
            var userData= { user : data };
            res.render('signup', userContent);
          })
    })
    .post((req, res) => {
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
            res.redirect('/dashboard');
        })
        .catch(error => {
            console.log(error)
        //    res.redirect('/signup');  as of 1/11 at 2:30pm - redirects to signup bc 'Map container not found' error
        });
    });


// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.render('login', userContent);
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        db.User.findOne({ where: { username: username } }).then(function (user) {

            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect(`/dashboard`);
            }
            console.log(JSON.stringify(req.session.user))
            console.log(JSON.stringify(req.session.user.id))
        });
    });

// route for finding user by username

// route for user's dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
		userContent.loggedin = true; 
		userContent.userName = req.session.user.userName; 
		console.log(req.session.user.userName); 
		userContent.title = "You are logged in"; 

        db.User.findOne({ where: { id: req.session.user.id, include: [db.Trip] } }).then(function(data){
            console.log('user dashboard processed');
            console.log(data);
            var userData= { user : data };
            res.render('dashboard', userData);
          })
        res.render('dashboard', userContent); //was index
    } else {
        res.redirect('/login');
    }
});

// route for user signup
app.route('/signup')
    .get((req, res) => {
        res.render('signup', userContent);
    })
    .post((req, res) => {
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            userContent.loggedin = true; 
            req.session.user = user.dataValues;
            res.redirect('/dashboard');
        })
        .catch(error => {
            res.redirect('/signup');
        });
    });

// route for user's trips
app.route('/trips')
    .get((req, res) => {
        res.render('trips');
    })

// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
		userContent.loggedin = false; 
		userContent.title = "You are logged out!"; 
        res.clearCookie('user_sid');
		console.log(JSON.stringify(userContent)); 
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});


db.sequelize.sync({force: false}).then(function() {

    app.listen(app.get('port'), function() {
      console.log("App listening on PORT " + app.get('port'))
      console.log('werk')
    });
  });
