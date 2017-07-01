
//current work:
// -- everything should be set up except for creation of table models. Will wait for logic to dictate what tables need to be created
// -- next step is to whiteboard to breakdown steps







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
