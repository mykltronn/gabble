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



// v v v this works. If login.mustache has ...
/*   <div class="">

    <ul>
      {{#user}}
      <li>{{name}}</li>
        {{#posts}}
      <li>{{body}}</li>
        {{/posts}}
      {{/user}}
    </ul>

  </div>

  */

  //this returns the user name and her comments!

// router.get('/login', function(res, req){
//   console.log("User accesses '/login'");
//   models.user.findOne({
//     where: {id: 2},
//     include: [
//       {
//         model: models.post,
//         as: 'posts'
//       }
//     ]
//   }).then(function(user){
//       console.log(user.posts);
//       req.render('login.mustache', { user : user })
//   })
//
// })














//
module.exports = router;



//
