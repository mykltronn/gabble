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

app.use(session({
  secret: 'donut floaty',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('public'));
app.use(express.static('scripts'));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', "./public/views");

app.use(bodyParser.urlencoded({ extended : false }));
app.use(validator());
app.use(morgan('dev'));

var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.use(routes);

app.set('port', (process.env.PORT || 5000))
app.listen(app.get('port'), function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// app.listen(8080, function(req, res){
//   console.log("Server running, listening on port 8080. CRUSH IT!!!");
// })
