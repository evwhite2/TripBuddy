var db = require("../models");
var express = require("express");
var router = express.Router();


const sessionChecker = require("../server");

//generate user specific info
const userContent = { userName: '', loggedin: false, body: 'yo'}


router.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(allusers) {
      res.json(allusers);
      })
});
    
router.post("/api/users", (req, res)=>{
    console.log("new user: "+ req.body);

    db.User.create({
      firstName : req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email
      //should include validation for email and username
    }).then((newUser) => {
      res.json(newUser)
     // req.session.newUser = newUser.dataValues  **ERROR MSG: TypeError: Cannot set property 'newUser' of undefined
      console.log("added!: "+ newUser)
     // res.redirect('/home.handlebars');  **ERROR MSG: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
      res.end();
    }).catch(function(err) {
      // if error, print the error details
      console.log(err, req.body.userName);
  });
 });

router.delete("/api/users/:id", (req, res)=>{
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then((res)=> {
      res.json(res);
    })
    });


  module.exports = router