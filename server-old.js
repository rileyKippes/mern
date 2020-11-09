'use strict'


//loadConfig();

configuration.loadConfig();

var express = require('express');
var app = express();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var cookie = require('cookie-parser');
var body = require('body-parser').urlencoded({ extended: true });
var jsonBody = require('body-parser').json();
var mult = require('multer');
var multer = mult();
var session = require('express-session');
var morgan = require('morgan');
var fs = require('fs');
var enableDestroy = require('server-destroy');

var index = require('./routes/index');
var portfolio = require('./routes/portfolio/portfolio');
var user = require('./routes/user/user');
var file_not_found = require('./routes/file_not_found');

var port = configuration.getConfig().port;

//logging
var accessLogStream = fs.createWriteStream('./access.log');
app.use(morgan(configuration.getConfig().consoleLog));
app.use(morgan(configuration.getConfig().fileLog, { stream: accessLogStream }));

app.use(multer.array());

app.use(cookie());
app.use(body);
app.use(jsonBody);


/*******************
** Passport stuff **
*******************/

var mongo = require('mongodb').MongoClient;

var mURL = configuration.getConfig().mongo.url;
var dbName = configuration.getConfig().mongo.db;
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
const bodyParser = require('body-parser');
//const { config } = require('chai');

passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
	var client = new mongo(mURL, { useUnifiedTopology: true });
	client.connect(function (err) {
		var db = client.db(dbName);
		const collection = db.collection(collName);

		var ObjectID = require('mongodb').ObjectID;

		collection.findOne({ _id: new ObjectID(_id) }).then((user) => {
			if (user === undefined || user === null) {
				return done(new Error('User ' + _id + ' does not exist'));
			}
			return done(null, user);
		}).catch((err) => {
			return done(new Error('Error: ' + err));
		});
	});
});

//docs were wrong. Again. You can't use the code from the docs.
passport.use(new localStrategy(function (username, password, done) {
	var client = new mongo(mURL, { useUnifiedTopology: true });
	client.connect(function (err) {
		var db = client.db(dbName);
		const collection = db.collection(collName);
		collection.findOne({ username: username }).then((user) => {
			bcrypt.compare(password, user.password).then((result) => {
				if (!result) {
					return done(null, false, { message: 'Incorrect username or password' });
				};
				return done(null, user);
			}).catch((err) => {
				console.error(err);
				return done(null, false, { message: 'Incorrect username or password' });
			});

		}).catch((err) => {
			console.error(err);
			return done(null, false, { message: 'Incorrect username or password' });
		});
	});
}));

app.use(passport.initialize());
app.use(passport.session());

/*******************
**  End Passport  **
*******************/

app.use('/', index);
app.use('/p', portfolio);
app.use('/u', user);
app.use(express.static('public'));
app.use(express.static('static'));
app.use('*', file_not_found);

var server = app.listen(port, utils.listen);

enableDestroy(server);

function exit() {
	server.destroy();
	console.log('\nServer closed.');
	process.exit(0);
}

//On shutdown, exit with code 0
//SIGINT is when you ctrl+c
//SIGTERM is when the OS wants it dead, but no big deal
process.on('SIGINT', exit);
process.on('SIGTERM', exit);
