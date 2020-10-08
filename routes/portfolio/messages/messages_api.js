var express = require('express');
var router = express.Router();
var utils = require('../../utils');
var mongo = require('mongodb').MongoClient;

const config = utils.getConfig();
var url = config.mongo.url;
var dbname = config.mongo.db;
const collName = "messages";

//get messages
router.get('/', function (req, res) {
	var client = new mongo(url, { useUnifiedTopology: true });
	client.connect().then(() => {
		return client.db(dbname);
	}).then((db) => {
		const collection = db.collection(collName);
		collection.find({ $or: [{ sender: req.user.username }, { reciever: req.user.username }] }).sort({ utc: -1 }).toArray().then((docs) => {
			res.status(200).json(docs);
		}).catch((err) => {
			console.error(err);
			res.status(500).json({ error: err });
		});
	}).catch((err) => {
		console.error(err);
		res.status(500).json({ error: err });
	});

});

//post messages
router.post('/', function (req, res) {
	var client = new mongo(url, { useUnifiedTopology: true });
	client.connect().then(() => {
		return client.db(dbname);
	}).then((db) => {
		var d = new Date();
		var currUTC = Date.now();
		const collection = db.collection(collName);
		var newComment = "failed to send message";
		if (req.body != undefined) {
			newMessage = req.body.newMessage;
		}
		else {
			utils.debug("Cookie:" + JSON.stringify(req.cookies));
		}
		// Insert a comment.
		collection.insertOne({
			newMessage: newMessage,
			utc: currUTC,
			sender: req.user.username,
			reciever: req.body.reciever,
			color: req.user.color
		}).catch((err) => {
			console.error(err);
			res.sendStatus(500);
		});
	}).then(() => {
		res.sendStatus(200);
	}).catch((err) => {
		console.error(err);
		res.sendStatus(500);
	});
});

module.exports = router;
