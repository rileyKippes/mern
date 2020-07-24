var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var utils = require('../utils');

const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
const collName = 'users';

router.get('/',function (req,res) {
	//require('connect-ensure-login').ensureLoggedIn();
	var client = new mongo(url,{ useUnifiedTopology: true });
	client.connect().then(() => {
		return client.db(dbName);
	}).then((db) => {
		const collection = db.collection(collName);
		collection.findOne({username:req.user.username}).then((docs) => {
		res.status(200).json(docs);
	})
	}).catch((err) => {
		console.log(err);
		res.status(500).json({status:500,error:err});
	}); 
	
});


module.exports = router;
