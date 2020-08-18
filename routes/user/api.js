var express = require('express');
var router = express.Router();
var utils = require('../utils');
var mongo = require('mongodb').MongoClient;

const config = utils.getConfig();
var url = config.mongo.url;
var dbName = config.mongo.db;
const collName = "users";

router.get('/',function (req,res) {
	if(req.user === undefined || req.user === null) {
		res.status(401).json({
			status:401,
			message:"You are not logged in" });
	}
	else { res.status(200).json(req.user); }
	
});

function generateColor(){
	var hex = ['0','a','f'];
	var ret = '#';
	var rand;
	for(var i = 0; i < 6; i++){
		rand = Math.floor(Math.random() * hex.length);
		ret += hex[rand];
	}
	return ret;
}

router.post('/',function (req,res) {
	var client = new mongo(url,{ useUnifiedTopology: true });
	client.connect().then(() => {
		return client.db(dbName);
	}).then((db) => {
		const collection = db.collection(collName);
		var newColor = generateColor();
		// Insert a comment.
		collection.updateOne(
			{_id:req.user._id},
			{$set :{color:newColor}});
	}).then(() => {
		res.status(200).json(req.user);
	}).catch((err) => {
		console.log(err);
	});
});

module.exports = router;
