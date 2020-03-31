var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
var fnf = require('./routes/fnf'); //File Not Found page
var user = require('./routes/user/user');

var port = 8080;

function listen(){
	console.log(' Now Listening at http://localhost:8080/ \n');
}

function getPrettyTime(){
	var d = new Date();
	var date = d.getFullYear()+'-';
	date += d.getMonth().toString().padStart(2,'0')+'-';
	date += d.getDate().toString().padStart(2,'0');
	var time = d.getHours().toString().padStart(2,'0')+':';
	time += d.getMinutes().toString().padStart(2,'0')+':';
	time += d.getSeconds().toString().padStart(2,'0');
	return date + ' ' + time;
}

//log every request to server
app.use(function(req, res, next) {
	console.log(getPrettyTime()+' @ '+ req.originalUrl);
	next();
});

/*app.use('/',function(req,res,next) {
	console.log("/ was called for");
	next();
});*/
app.use('/',index);
app.use('/api',api);
app.use('/u',user);
//app.use('/login',login);
app.use(express.static('public'));
app.use('*',fnf);

app.listen(port,listen);
