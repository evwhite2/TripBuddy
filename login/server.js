const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const User = require("./models/user.js");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

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
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// handle bars config
app.engine('hbs', hbs({extname: 'hbs',defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'})); 
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'hbs'); 
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

var userContent = {userName: '', loggedin: false, title: "You are not logged in today", body: "Hello World"}; 

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


// route for user signup
app.route('/signup')
    //.get(sessionChecker, (req, res) => {
    .get((req, res) => {
        //res.sendFile(__dirname + '/public/signup.html');
        res.render('signup', userContent);
    })
    .post((req, res) => {
        User.create({
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
            res.redirect('/signup');
        });
    });


// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        //res.sendFile(__dirname + '/public/login.html');
        res.render('login', userContent);
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
            console.log(username)
        });
    });


// route for user's dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
		userContent.loggedin = true; 
		userContent.userName = req.session.user.username; 
		//console.log(JSON.stringify(req.session.user)); 
		console.log(req.session.user.username); 
		userContent.title = "You are logged in"; 
        //res.sendFile(__dirname + '/public/dashboard.html');
        res.render('index', userContent);
    } else {
        res.redirect('/login');
    }
});

// route for user's dashboard
app.get('/trips', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
		userContent.loggedin = true; 
		userContent.userName = req.session.user.username; 
		//console.log(JSON.stringify(req.session.user)); 
		console.log(req.session.user.username); 
		userContent.title = "Your trips"; 
        //res.sendFile(__dirname + '/public/dashboard.html');
        res.render('trips', userContent);
    } else {
        res.redirect('/dashboard');
    }
});

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


// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));
