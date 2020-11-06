var express = require('express');
var router = express.Router();
var utils = require('../utils');
var mongo = require('mongodb').MongoClient;

const config = utils.getConfig();
var url = config.mongo.url;
var dbName = config.mongo.db;
const collName = "users";

router.get('/', function (req, res) {
	if (req.user === undefined || req.user === null) {
		res.status(401).json({
			status: 401,
			message: "You are not logged in"
		});
	}
	else {
		res.status(200).json(req.user);
	}
});

router.post('/', function (req, res) {
	var client = new mongo(url, { useUnifiedTopology: true });
	client.connect().then(() => {
		return client.db(dbName);
	}).then((db) => {
		const collection = db.collection(collName);
		var newColor = utils.generateColor();
		collection.updateOne(
			{ _id: req.user._id },
			{ $set: { color: newColor }
			}).catch((err) => {
				console.error(err);
				res.sendStatus(500);
			});
	}).then(() => {
		res.status(200).json(req.user);
	}).catch((err) => {
		console.error(err);
		res.sendStatus(500);
	});
});

module.exports = router;
