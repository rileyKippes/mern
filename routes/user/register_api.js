var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');

var url = 'mongodb://localhost:27017';
var dbName = 'mydb';
var collName = 'users';

var saltRounds = 10;

function generateColor(){
	var hex = ['0','a','f'];
	var ret = '#';
	var rand;
	for(var i = 0; i < 6; i++){
		rand = Math.floor(Math.random() * hex.length);
		ret += hex[rand];
	}
	console.log('Generated color is '+ret);
	return ret;
}

router.post('/',function (req,res) {
	console.log('Register api');
	console.log(JSON.stringify(req.body));
	if(req.body.password !== req.body.confirm_password){
		console.log("Passwords do not match");
		res.sendStatus(422);
	}
	else {
		var client = new mongo(url,{ useUnifiedTopology: true });
		client.connect().then(() => {
			return client.db(dbName);
		}).then((db) => {
		//first check if there's already a user with that username
		const collection = db.collection(collName);
		if(collection.find({username:req.body.username}).count() > 0)
		{  //.find() is quicker than .findOne()
			console.log("User already exists");
			var user = collection.findOne({username:req.body.username});
			console.log(JSON.stringify(user));
			res.sendStatus(422);
		}
		else {
			bcrypt.hash(req.body.password, saltRounds).then((hash) => {
			var color = generateColor();
			collection.insertOne({
							username:req.body.username,
							password:hash,
							color:color
							}).then(() => {
				res.sendStatus(201);
			});
			});
			}
		}).catch((err) => {
			console.log(err);
		});
	}
});

module.exports = router;
