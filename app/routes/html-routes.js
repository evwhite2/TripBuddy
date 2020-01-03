module.exports = function(app){

var express = require('express');
var app = express();

var db= require("../models"); 

  app.get("/", (req, res)=>{
      res.render('index')
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
