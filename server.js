'use strict'
var utils = require('./routes/utils');
var config = utils.loadConfig();

var express = require('express');
var app = express();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var cookie = require('cookie-parser');
var body = require('body-parser').urlencoded({ extended: true });
var mult = require('multer');
var multer = mult();
var session = require('express-session');
var morgan = require('morgan');
var fs = require('fs');
var enableDestroy = require('server-destroy');

var index = require('./routes/index');
var api = require('./routes/api');
var portfolio = require('./routes/portfolio/portfolio');
var user = require('./routes/user/user');
var file_not_found = require('./routes/file_not_found'); 


var port = config.port;

//logging
var accessLogStream = fs.createWriteStream('./access.log');
app.use(morgan(config.console_log));
app.use(morgan(config.file_log, { stream: accessLogStream }));

app.use(multer.array()); 
app.use(cookie());
app.use(body);


/*******************
** Passport stuff **
*******************/

var mongo = require('mongodb').MongoClient;

var mURL = config.mongo.url;
var dbName = config.mongo.db;
var collName = 'users';

//bcrypt

app.use(
	session({
		secret: 'Neuromancer is a great book', //random string, used for hash
			//also, it really is a good book
		resave: false,
		saveUninitialized: false
	})
)

var bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
	var client = new mongo(mURL,{ useUnifiedTopology: true });
	client.connect(function(err) {
		var db =  client.db(dbName);
		const collection = db.collection(collName);
		
		var ObjectID = require('mongodb').ObjectID;

		collection.findOne({_id: new ObjectID(_id) } ).then((user) => { 
		if(user === undefined || user === null){
			done(new Error('User ' + _id + ' does not exist'));
		}
		done(null, user);
		}).catch((err) => {
		console.log(err);
		done(new Error('Error: '+err));
	});
	});
});

passport.use(new localStrategy(function(username,password,done) {
	var client = new mongo(mURL,{ useUnifiedTopology: true });
	client.connect(function(err) {
		var db =  client.db(dbName);
		const collection = db.collection(collName);
		collection.findOne({username:username}).then((user) => { 
		bcrypt.compare(password, user.password).then((result) => {
			if(!result){ 
				return done(null, false, {message: 'Incorrect username or password'}) 
			};
			return done(null, user);
		}).catch((err) => {
			console.log(err);
			done(new Error('Error: '+err)); });
		
		});
	});
}));

app.use(passport.initialize());
app.use(passport.session());

/*******************
**  End Passport  **
*******************/

app.use('/',index);
app.use('/api',api);
app.use('/p',portfolio);
app.use('/u',user);
app.use(express.static('public'));
app.use(express.static('static'));
app.use('*',file_not_found);

var server = app.listen(port,utils.listen);

enableDestroy(server);

function exit(){
	server.destroy();
	console.log('\nServer closed.');
	process.exit(0);
}

//On shutdown, exit with code 0
//SIGINT is when you ctrl+c
//SIGTERM is when the OS wants it dead, but no big deal
process.on('SIGINT' ,exit);
process.on('SIGTERM',exit);
