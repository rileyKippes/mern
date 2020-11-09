var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');
var utils = require('../../ts_built/utils');

var config = require('../../ts_built/config').getConfig();
var url = config.mongo.url;
var dbName = config.mongo.db;
var collName = 'users';

var saltRounds = 10;

router.post('/', function (req, res) {
	if (req.body.password !== req.body.confirm_password) {
		res.redirect('/u/register?err=password_equality'); 
	}
	else {
		var client = new mongo(url, { useUnifiedTopology: true });
		client.connect().then(() => {
			return client.db(dbName);
		}).then((db) => {
			//first check if there's already a user with that username
			const collection = db.collection(collName);
			collection.find({ username: req.body.username }).count().then((num) => {
				if(num > 0){ 
					return res.redirect('/u/register?err=user_already_exists'); 
				}
				else {
					bcrypt.hash(req.body.password, saltRounds).then((hash) => {
						var color = utils.generateColor();
						collection.insertOne({
										username:req.body.username,
										password:hash,
										color:color
										}).then(() => {
							return res.redirect('/u/login');
						});
					}).catch((err) => {
						//how did you get here?
						// Managed to fetch from mongo, but not insert.
						console.error(err);
						return res.redirect('/u/register?err=unknown_error');
					});
				}
			}).catch((err) => {
				//really shouldn't get here, something is really messed up
				console.error(err);
				return res.redirect('/u/register?err=unknown_error');
			});
		}).catch((err) => {
			//might be a database error here
			console.error(err);
			return res.redirect('/u/register?err=unknown_error');
		});
	}
});

module.exports = router;
