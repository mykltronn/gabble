const express = require('express');
const models = require("./models");

const router = express.Router();
//_________________________________________________________________________
//           functions.  These will go in to another file eventually







//_________________________________________________________________________
//            routes

// root
router.get('/', function(res, req){
  console.log("User accesses '/'");
  // user first visits site

  if(req.session && req.session.authenticated){
    console.log();
    req.render('index.mustache', { title : "root page"})
  }
  else {
    console.log("user redirected to login: lack of credentials");
    req.redirect('/login')
  }
})

// login page
router.get('/login', function(res, req){
  console.log("User accesses '/login'");
  req.render('login.mustache', { title : "login page!"})
})

module.exports = router;
