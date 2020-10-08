var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');
var utils = require('../utils');

const config = utils.getConfig();
var url = config.mongo.url;
var dbName = config.mongo.db;
var collName = 'users';

var saltRounds = 10;

function generateColor() {
	var hex = ['0', 'a', 'f'];
	var ret = '#';
	var rand;
	for (var i = 0; i < 6; i++) {
		rand = Math.floor(Math.random() * hex.length);
		ret += hex[rand];
	}
	return ret;
}

router.post('/', function (req, res) {
	console.log('Register api');
	console.log(JSON.stringify(req.body));
	if (req.body.password !== req.body.confirm_password) {
		console.log("Passwords do not match"); //accurately gets here
		res.redirect('/u/register?err=password_equality'); 
	}
	else {
		var client = new mongo(url, { useUnifiedTopology: true });
		client.connect().then(() => {
			return client.db(dbName);
		}).then((db) => {
			//first check if there's already a user with that username
			const collection = db.collection(collName);
			if (collection.find({ username: req.body.username }).count() > 0) {
				console.log("User already exists"); //doesn't get here
				var user = collection.findOne({ username: req.body.username });
				console.log(JSON.stringify(user));
				res.redirect( '/u/register?err=user_already_exists');
			}
			else {
				bcrypt.hash(req.body.password, saltRounds).then((hash) => {
					var color = generateColor();
					//for testing only
					console.log("Would have created a new user");
					res.sendStatus(201);

					/*collection.insertOne({
									username:req.body.username,
									password:hash,
									color:color
									}).then(() => {
						return res.redirect(308,'/u/login'); //this end works perfectly
					});*/
				});
			}
		}).catch((err) => {
			console.log(err);
			return res.redirect(308, '/u/register?err=unknown_error');
		});
	}
});

module.exports = router;
