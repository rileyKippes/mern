'use strict'

var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var utils = require('../../utils');

const config = utils.getConfig();
var url = config.mongo.url;
const dbname = 'chat';
const collName = "comments";


router.get('/',function (req,res) {
	var client = new mongo(url,{ useUnifiedTopology: true });
	client.connect().then(() => {
		return client.db(dbname);
	}).then((db) => {
		const collection = db.collection(collName);
		collection.find().sort({utc:-1}).limit(15).toArray().then((docs) => {
		res.status(200).json(docs);
	}).catch((err) => {
		console.log(err); 
	})
	}).catch((err) => {
		console.log(err);
	}); 
	
});



//uses the logged in user's color now
//it used to use a variable that was isolated to the script
//but now it's integrated!
router.post('/',function (req,res) {
	var client = new mongo(url,{ useUnifiedTopology: true });
	client.connect().then(() => {
		return client.db(dbname);
	}).then((db) => {
		var d=new Date();
		var currUTC = Date.now();
		const collection = db.collection(collName);
		var newComment = "failed to post comment";
		if(req.body != undefined){
			newComment = req.body.comment;
		}
		else{
			utils.debug("Cookie:"+JSON.stringify(req.cookies));
		}
		// Insert a comment.
		collection.insertOne({
						comment:newComment,
						utc:currUTC,
						cookie:req.user.color
	})
	}).then(() => {
		res.sendStatus(200);
	}).catch((err) => {
		console.log(err);
	});

});

module.exports = router;
