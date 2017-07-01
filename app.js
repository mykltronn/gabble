const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const mustache = require('mustache-express')
const parseurl = require('parseurl')
const validator = require('express-validator')
const morgan = require('morgan')

const models = require('./models')
const routes = require("./routes.js");

const app = express();

app.use(express.static('public'));
app.use(express.static('scripts'));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', "./public/views");

app.use(bodyParser.urlencoded({ extended : false }));
app.use(validator());
app.use(morgan('dev'));

app.use(session({
  secret: 'donut floaty',
  resave: false,
  saveUninitialized: true
}));


app.use(routes);


app.listen(8080, function(req, res){
  console.log("Server running, listening on port 8080. CRUSH IT!!!");
})
