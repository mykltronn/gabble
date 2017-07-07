// current working problem line 60 routes.js -- visit http://docs.sequelizejs.com/manual/tutorial/querying.html   and see "Order" section to check on current trajectory...... or https://stackoverflow.com/questions/36259532/sequelize-findall-sort-order-in-nodejs or https://stackoverflow.com/questions/36259532/sequelize-findall-sort-order-in-nodejs

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
    if(callback){
      callback(req, res, username, pass);
    }
  })
}





//_________________________________________________________________________
//            routes

// root
router.get('/', function(req, res){

  console.log("User accesses '/'");
  // user first visits site
  //if(req.session && req.session.authenticated){

    models.user.findAll({
      // order: [users, 'createdAt', 'DESC'],
      include: [{
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
        }]
    }).then(function(userInfo){
      console.log(" v v v v               v       v            v v v v ");
      console.log(" v v v v                v     v             v v v v ");
      console.log(" v v v v                 v   v              v v v v ");
      console.log(" v v v v                  v v               v v v v ");
      console.log(" v v v v                   v                v v v v ");
      console.log(" v v v v here's the info you're looking for v v v v ");
      console.log(req.body.postBody);
      // console.log(userInfo);

      // for(i=0; i < userInfo.length; i++){
      //   console.log("number of posts by user: " + userInfo[i].posts.length);
      //   for(j=0; j < userInfo[i].posts.length; j++){
      //     console.log("likes per post!!: " + userInfo[i].posts[j].likes.length);
      //   }
      // }

      // here's the sticky bit. Line 126 successfully logs to postId of the post that the delete button should be deleting, but I want the DELETE button to only display if that post belogns to activeUser. So somehow I have to compare activeUser against the owner of whichever post itteration is being displayed in index. The problem is, that loop only exists in mustache form! Not here! As far as I know the only way I can compare a value inside this file against someting dynamically generated client side is by taking a user POST and parsing the body for a form... maybe I should read bodyparser documentation to see if there's more it can do. --- after reading a BIT of bodyparser docs it looks like almost any part of the body can be parsed, but it seems to come particularly from a POST... I'll have to test if this is true. The only question then, is how do I idenfity the part of req.body I want to select? req.body.classname even? Because then I can select the value of <li>{{name}}</li>.
      // it's the same problem with the likes number.


      models.user.findById(req.session.activeUser).then(function(user){

        var owner = true;

        if(user){

          console.log('Current active user is ' + user.name);
          console.log(req.session.postErr);
          res.render('index', {
            user: userInfo,
            currentUser: user.name,
            authenticated: req.session.authenticated,
            postErr: req.session.postErr,
            owner: owner
          })
        }
        else {
          res.render('index', {
            user: userInfo,
            authenticated: req.session.authenticated,
          })
        }
      })
    })
  /*}
  else {
    console.log("user redirected to login: lack of credentials");
    res.redirect('/login')
  } */
})

// need to add validation here
// -- user can't like same post more than once

// user posts new comment or like
router.post('/', function(req, res){
  console.log("user POSTs to '/' ");

  // if there is a "like submission" then run this
  if(req.body.postItteration){
    console.log('...and POSTs a new like');

    // needing to validate likes 

    console.log("like added by userId " + req.session.activeUser + ", to postId " + req.body.postItteration);
    const newLike = models.like.build(
                {
                  userId: req.session.activeUser,
                  postId: req.body.postItteration
                })

    newLike.save()
    res.redirect('/');

  }
  // delete post if user is owner
  else if (req.body.deletepost) {
    console.log("userId is: " + req.body.userId + " and activeUser is: " + req.session.activeUser);
    if(req.body.userId == req.session.activeUser){
      console.log("Post that will be deleted is postId: " + req.body.deletepost);
      models.post.destroy({
        where: {id: req.body.deletepost}
      }).then(function(userIdOfPostApparently){
        console.log("The following was deleted: " + req.body.deletepost);
        res.redirect('/');
      })
    }
    else {
      // req.session.postErr = "That's not yours to delete!!"
      res.redirect('/')
    }
  }

  // otherwise, build new post
  else {
    console.log('...and POSTs a new post');

    req.checkBody('postTitle', 'title must be between 1 and 25 characters').isLength({max: 25});
    req.checkBody('postTitle', 'post must have a title!').notEmpty();
    req.checkBody('postBody', 'post must be fewer than 140 characters').isLength({max: 140});
    req.checkBody('postBody', 'post cannot be empty!').notEmpty();

    if(req.validationErrors()) {
      req.session.postErr = req.validationErrors();
      console.log('error logged');
      res.redirect('/')
    }
    else {
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
  }
})






// user visits or is redirected to login
router.get('/login', function(req, res){
  console.log('user GETs login');

  /* if I had a cookie for the user, here I would include an if/else
    that checked if the user had a username and password*/

  res.render('login');

})

// user posts login info
router.post('/login', function(req, res){
  console.log('user POSTs form');
  var username = req.body.username;
  var pass = req.body.password;

  authenticate(req, res, username, pass, callback);

  function callback(req, res, username, pass){
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
router.get('/newuser', function(req, res){
  console.log("req.session.createErr reads in GET: " + req.session.createErr);
  if(!req.session.passErr){
    req.session.passErr = undefined;
  }
  if(!req.session.createErr) {
    req.session.createErr = undefined;
  }

  console.log('user GETs /newuser');

  res.render('newuser', {
                  passErr : req.session.passErr,
                  createErr: req.session.createErr
              })
})

router.post('/newuser', function(req, res){
  console.log('user POSTs to /newuser');
  models.user.findAll().then(function(users){

    var newName = req.body.username;
    var newPassword = req.body.password;
    var passConfirm = req.body.confirmpassword;

    console.log(newName);
    console.log(newPassword);
    console.log(passConfirm);

    for(i=0; i<users.length; i++){
    console.log("newName : " + newName + " , users[i].name: " + users[i].name);
      if(newName == users[i].name){
        console.log("newName is same as one of the names!");
        req.session.createErr = "that username is already taken"
        res.redirect('/newuser');
      }
    }

    if(newPassword == passConfirm && !req.session.createErr){
      var newUser = models.user.build({
        name: newName,
        password: newPassword
      })
      newUser.save();
      req.session.authenticated = true;
    }
    else {
      req.session.passErr = "passwords do not match!"
      console.log("req.session.passErr reads in ELSE: " + req.session.passErr);
      res.redirect('/newuser')
    }
  })
})

//logs out current user
router.get('/logout', function(req, res){
  console.log("user session destroyed");
  req.session.destroy();
  res.redirect('/');
})


module.exports = router;


//
