
***CURRENT TABLE ARRANGEMENT:
gabble=# SELECT * FROM users;
 id | username | password | createdAt | updatedAt
----+----------+----------+-----------+-----------
(0 rows)

gabble=# SELECT * FROM posts;
 id | title | body | createdAt | updatedAt | userId | likeId
----+-------+------+-----------+-----------+--------+--------
(0 rows)

gabble=# SELECT * FROM likes;
 id | tile | createdAt | updatedAt | userId | postId
----+------+-----------+-----------+--------+--------
(0 rows)




what are relationships between users, comments, likes, and other things??

 things to store in db:

 --[ user
 -- -- id
 -- -- username
 -- -- password
 -- -- -- -- -- user has many posts




 --[ post
 -- -- id
 -- -- title
 -- -- bodyuser
 -- -- date created
 -- -- user {foreign key} has one
 -- -- likes {foreign key} has many
 -- -- -- -- -- post has one user
 -- -- -- -- -- post has many likes

 --[ like
 -- --id
 -- --user who liked {foreign key} has one
 -- --post that was liked? {foreign key} has one
 -- -- -- -- -- likes have one user
 -- -- -- -- -- likes have one post


// things to store in session:
// -- is user logged in?


// user X:

--user makes request on '/'

------> app.get checks if(session-auth) ------> else {res.redirect('/login')}
                            |                         |
                            |                         |
                            |                         |
                            |                         |
                            |                         |
                            |                         V           
                            |                res.redirectres.render log-in page
                            |                  with nav bar and log or sign up
                res.render welcome page      user provides login ---> check against DB
                     ('/:username') <-------   if(user passes login check) res.redirect('/')
                     -- page displays



                     -- -- user can create new gab -- res.redirect------> '/newgab'



                     -- -- current gabs from all users

                     -- -- -- if under certain amount -----> displayed as boxes around page
                                                             sized according to number of likes.

                     -- -- -- if over that amount, list one by one.

                     -- -- -- gab is z-indexed based on likes, when user hovers over a gab z-index is raised to the top.




***GENERAL NOTES:  

consider including in database "enabled": true/false for whether or not user has login access. Looks like this:

if(table.enabled){

}

else{}


// can I use controllers in any way?
// -- checkout if something like a rails controller is accessible in JS









//

return queryInterface.bulkInsert('Post', [
  {
    title: "OMG",
    body: "Petunia, you have the most beautiful toe-feathers!!",
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    title: "Squirrels",
    body: "I don't know if anybody noticed, but the squirrels are back and they've eaten half my breakfast.",
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    title: "out of water",
    body: "If you're the one to finish the water, please refill it...",
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    title: "squirrels again",
    body: "I was just minding my own business, taking a dirt bath, and that damn squirrel up and stole my dinner!",
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    title: "COMPOST",
    body: "COMPOST COMPOST COMPOST HERE COMES THE COMPOST RUN AS FAST AS YOU CAN TO GET THE COMPOST",
    createdAt: Date.now(),
    updatedAt: Date.now()
  }

], {});



  "article on ux design versus product design"
  -- -- “Design thinking is neither art nor science nor religion. It is the capacity, ultimately, for integrative thinking.”

  
