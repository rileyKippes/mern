var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var cookie = require('cookie-parser');
var mult = require('multer');
var multer = mult();



var utils = require('./routes/utils');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
		console.log("User is finding one");
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));


var index = require('./routes/index');
var api = require('./routes/api');
var portfolio = require('./routes/portfolio/portfolio');
var user = require('./routes/user/user');
var file_not_found = require('./routes/file_not_found'); 

var port = 8080;

function listen(){
	console.log(' Now Listening at http://localhost:8080/ \n');
	console.log('    Date    |   Time   | Method | Route ');
}

//log every request to server
app.use(function(req, res, next) {
	utils.getPrettyLog(req);
	next();
});

app.post(function(req, res, next) {
	console.log(req.params);
	next();
});

app.use(multer.array()); 
app.use(cookie());

app.use('/',index);
app.use('/api',api);
app.use('/u',user);
app.use('/p',portfolio);
//app.use('/login',login);
app.use(express.static('public'));
app.use('*',file_not_found);

app.listen(port,listen);
