

PHASE ONE
the CORE functionality:
-- login/store authentication    [*]
-- create new user      [*]
-- create new post      [*]
-- like a post      [*]
-- delete post      [*]


PHASE TWO
VALIDATION and extended functionality:


-- user can only delete post if posts userId = activeUser       []

-- check username and password against DB        [*]
-- check if username already exists              [*]
-- check password against password-confirm          [*]
-- check new post for a title and body and check length of both   [*]
-- homepage displays without authentication but doesn't allow post   [*]
-- display NUMBER of likes        [*]
-- display date of modify to posts and likes      [*]

PHASE THREE:
FINISHING touches:

-- organize posts (newest first)      []
-- clean up post and like date and time   []
--[ modularize code               []
-- -- app.js should already be clean, but checkout      []
-- -- routes.js needs to be clean routes with minimal fuss, but scope will be an issue  []
-- -- create a functions.js or something to store functions and export    []
-- style that shit, maybe add scripts for coolness    []

PHASE FOUR:
Hard Mode:
-- user can only like a post once per postId        []
-- when new user is created, the user is also authenticated   []




**These are the original instructions from Newline


Gabble
Use Express and Sequelize to build a social network.

Use Express and Sequelize to build a social network for students. This network, called "Gabble," has users, public messages, and likes.


Users should:

have a username and password for logging in
have a display name

Messages should:

be associated with a user who wrote them
have up to 140 characters of text

Likes should:

be associated with a user who made the like and a message that was liked
The application should have ways to do the following:


Sign up as a new user
Log in
Log out
View all messages with the newest first
Create a new message
Delete one of your own messages
Like a message
See who liked a message
This will require your knowledge of forms, validation, sessions, middleware, and Sequelize. You will likely have to look up some features of these.

You may want to consider running sequelize seed:create and create a new seed file that will create several users and gabs.

Mockups you can optionally use

Homepage
Homepage.png
Sign up
Sign up.png
Log in
Log in.png
Create a new gab
New gab page.png
See list of likes
List of likes.png
Links to documentation

Express
body-parser
express-validator and its underlying library, node-validator
express-session
Sequelize


***Logic for login and sessions.

User can either login, or create a new account. (If I want to add cookies, /login can check for cookie containing user and password)

login and create forms can exist on same route, possibly. Would it be worth it? What would the form look like...

probably best just to route to /newuser for user creation

user login form posts to where? Back to /login to check the data and then redirect to '/'?







***CURRENT TABLE ARRANGEMENT:
id |     name      |         createdAt          |         updatedAt
----+---------------+----------------------------+----------------------------
 1 | Petunia       | 2017-07-01 16:40:17.849-04 | 2017-07-01 16:40:17.849-04
 2 | Dotty McCloud | 2017-07-01 16:40:32.94-04  | 2017-07-01 16:40:32.94-04
 3 | Tabitha       | 2017-07-01 16:41:07.445-04 | 2017-07-01 16:41:07.445-04
 4 | Mrs. Pibb     | 2017-07-01 16:41:17.416-04 | 2017-07-01 16:41:17.416-04
 5 | Trisha        | 2017-07-01 16:41:25.965-04 | 2017-07-01 16:41:25.965-04
(5 rows)


gabble=# SELECT * FROM posts;
id |      title       |                                                  body                                                  |         createdAt          |         updatedAt          | userId
----+------------------+--------------------------------------------------------------------------------------------------------+----------------------------+----------------------------+--------
6 | OMG              | Petunia, you have the most beautiful toe-feathers!!                                                    | 2017-07-01 16:51:54.799-04 | 2017-07-01 16:51:54.799-04 |      2
7 | Squirrels        | I don't know if anybody noticed, but the squirrels are back and they've eaten half my breakfast.       | 2017-07-01 16:53:43.132-04 | 2017-07-01 16:53:43.132-04 |      5
8 | out of water     | if you're the one to finish the water, please refill it...                                             | 2017-07-01 16:54:29.281-04 | 2017-07-01 16:54:29.281-04 |      1
9 | squirrels again! | I was just minding my own business, taking a dirt bath, and that damn squirrel up and stole my dinner! | 2017-07-01 16:55:11.358-04 | 2017-07-01 16:55:11.358-04 |      5
10 | COMPOST          | COMPOST COMPOST COMPOST HERE COMES THE COMPOST RUN AS FAST AS YOU CAN GET THE COMPOST                  | 2017-07-01 16:56:05.455-04 | 2017-07-01 16:56:05.455-04 |      2
(5 rows)

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





1
Petunia

2
Dotty McCloud

3
Tabitha

4
Mrs. Pibb

5
Trisha

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
