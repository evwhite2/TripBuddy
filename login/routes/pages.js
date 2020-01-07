const express = require('express');
const User = require('./../core/user');
const router = express.Router();

const user = new User();

//get index page
router.get('/', (req, res, next)=> {
    let user = req.session.user;
    if(user) {
        res.redirect('/home');
        return;
    }
    res.render('index', {title: "Login System for Travel Buddy"})
});

//home page
router.get('/home', (req, res, next)=> {
    let user = req.session.user;

    if(user) {
        res.render('home', {opp:req.session.opp, name:user.name});
        return;
    }

    res.redirect('/');
});

//post login data
router.post('/login', (req, res, next)=> {
    user.login(req.body.username, req.body.password, function(result) {
        if(result) {

            req.session.user = result;
            req.session.opp = 1;

            res.redirect('/home');
        } else {
            res.send('Username or Password not found');
        }
    })
});

//post register data
router.post('/register', (req, res, next)=>{
    
    let userInput = {
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        address: req.body.address,
        email: req.body.email
    };

    user.create(userInput, function (lastId) {
        if(lastId) {
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/home');
            });

        } else {
            res.send('Error creating a new user')
        }
    });
});

//log out 
router.get('/logout', (req, res, next)=> {
    if(req.session.user) {
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

module.exports = router;