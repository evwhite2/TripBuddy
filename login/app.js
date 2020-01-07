const express = require('express');
const session = require('express-session');
const path = require('path');
const pageRouter = require('./routes/pages');
const app = express();

// for body parser. to collect data that sent from the client.
app.use(express.urlencoded( { extended : false}));


// Serve static files. CSS, Images, JS files ... etc
app.use(express.static(path.join(__dirname, 'public')));


// Template engine. PUG
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//set up session so can stay logged in
app.use(session(
    {
        secret: 'nodelogin',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 1000 * 30
        }
    }
));

//Routers
app.use('/', pageRouter);

//error 404
app.use((req, res, next)=>{
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
})

//handling errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

// Setting up the server
app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});

module.exports = app;








/*
//packages
const express = require('express');
const path = require('path');

const app = express();

/*
from youtube page : https://www.youtube.com/watch?v=-RCnNyD0L-s

tutorial DOES NOT include a database - splits at 12:00 into video
uses 'ejs' as a template system instead of handlebars
const bcrypt = require('bcrypt');

const users = [];



app.use(express.urlencoded({ extended: false }));

//server static files
app.use(express.static(path.join(__dirname, 'public')));

//template system
app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'pug')


app.get('/', (req, res)=> {
    res.render('index');
})


//set up server
app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
})

module.exports = app;

*/