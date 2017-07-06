
//current work:


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
