// current working problem line 88 routes.js,  see corresponding line 36 in index.mustache

const express = require('express');
const models = require("./models");

const router = express.Router();
//_________________________________________________________________________
//           functions.  These will go in to another file eventually


function authenticate(req, res, username, pass, callback){
  var activeUser = req.session.activeUser;
  var authenticated = req.session.authenticated;

  console.log('function: authenticate runs');
  console.log('authenticate has access to ' + username + " and " + pass);

  //-- 1. create array of all users
  models.user.findAll().then(function(users){
    if(!authenticated) {
      authenticated = req.session.authenticated = false;
      activeUser = req.session.activeUser;

      console.log("point ONE logs " + req.session.authenticated);
      //-- 2. loop through array and search for match to req.body data
      for(i=0; i<users.length; i++){
        // -- 3. if match exists, define active user and authenticated
        if(username == users[i].name && pass == users[i].password){
          console.log('user passes authentication as id ' + users[i].id);

          req.session.activeUser = users[i].id
          req.session.authenticated = true;
          console.log("point ONE AND A HALF logs " + req.session.authenticated);

        }
      }
    console.log("point TWO logs " + req.session.authenticated + " and " + req.session.activeUser);
    }
    callback(req, res, username, pass);
  })
}





//_________________________________________________________________________
//            routes

// root
//
router.get('/', function(req, res){
  console.log("User accesses '/'");
  // user first visits site
  if(req.session && req.session.authenticated){
    models.user.findAll({
      include: [
        {
          model: models.post,
          as: 'posts',
          include: [{
            model: models.like,
            as: 'likes',
            include:[{
              model: models.user,
              as: 'user'
            }]
          }]
        }
      ]

// here's the problem:
// -- the only way to access likes is by postId or userId. How can I display all the likes that have a particular posts id as its foreign key.


    }).then(function(userInfo){

      models.user.findById(req.session.activeUser).then(function(user){
        console.log('Current active user is ' + user.name);
        res.render('index',
        {
          user : userInfo,
          currentUser: user.name,
          authenticated: req.session.authenticated
        })
      })
    })
  }

  else {
    console.log("user redirected to login: lack of credentials");
    res.redirect('/login')
  }
})

// need to add validation here
// -- user can't like same post more than once
// -- validate post body and title for presence and length of content

// user posts new comment or like
router.post('/', function(req, res){
  console.log("user POSTs to '/' ");
  console.log(req.body.postItteration);
  if(req.body.postItteration){
    console.log('...and POSTs a new like');
    // var activeUser = 3 // this will be req.session.active at some point

    console.log("like added by userId " + req.session.activeUser + ", to postId " + req.body.postItteration);
    const newLike = models.like.build(
                {
                  userId: req.session.activeUser,
                  postId: req.body.postItteration
                })

    newLike.save()

  }
  // how to have like submit button return the post that was clicked for building with postId? Currently trying to return the 'value=' property of a hidden input and passing it mustache. See index.mustahce line 36
  // also how to add up likes. something has to count the likes. can it just be the number of items in the likes table?

  else {
    console.log('...and POSTs a new post');
    // var activeUser = 3; // this eventually is defined in session

    var newTitle = req.body.postTitle
    var newBody = req.body.postBody

    var newPost = models.post.build({
      title: newTitle,
      body: newBody,
      userId: req.session.activeUser
    })
    newPost.save();
  }

  res.redirect('/');
})







router.get('/login', function(req, res){
  console.log('user GETs login');

  /* if I had a cookie for the user, here I would include an if/else
    that checked if the user had a username and password*/

  res.render('login');

})



router.post('/login', function(req, res){
  console.log('user POSTs form');
  var username = req.body.username;
  var pass = req.body.password;

  authenticate(req, res, username, pass, callback);
  function callback(req, res, username, pass){
    console.log("point FOUR logs " + req.session.authenticated + " and " + req.session.activeUser);
    if(req.session && req.session.authenticated){
      console.log('user successfully logged in');
      res.redirect('/')
    }
    else {
      console.log('user failed to log in');
      res.redirect('/login')
    }
  }

})



// login page

// create new user
// possibly use same page as index or login but dynamically change form like World-o-links
router.get('/newuser', function(req, res){
  console.log('user GETs /newuser');
  res.render('newuser');
})

// v v v  this needs to validate form info as well as whether or not password confirm matches password v v v
router.post('/newuser', function(req, res){
  console.log('user POSTs to /newuser');
  var newName = req.body.username;
  var newPassword = req.body.password;

  console.log(newName);
  console.log(newPassword);

  var newUser = models.user.build({
    name: newName,
    password: newPassword
  })
  newUser.save();

  // HERE authenticate the new use
  res.redirect('/');

})




//logs out current user
router.get('/logout', function(req, res){
  console.log("user session destroyed");
  req.session.destroy();
  res.redirect('/login');
})




// const like = models.like.build({
//   userId: 3,
//   postId: 1
// })
//
// like.save()

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

// router.get('/login', function(req, res){
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
//       res.render('login.mustache', { user : user })
//   })
//
// })

// router.post("/newuser", function (req, res) {
//     req.checkBody("title", "You must include a title.").notEmpty();
//     req.checkBody("url", "Your URL is invalid.").isURL();
//
//     const newData = {
//         name: req.body.username,
//         password: req.body.password
//     };
//
//     req.getValidationResult().then(function (result) {
//         if (result.isEmpty()) {
//             models.user.create(newData).then(function (user) {
//                 res.redirect("/");
//             });
//         } else {
//             const user = models.user.build(newData);
//             res.render("form", {
//                 errors: errors,
//                 user: user
//             })
//         }
//     })
// });












//
module.exports = router;



//
