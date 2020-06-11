var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbname = 'chat';
const collName = "comments";

var i = 0; //for logging number of failed comments.

const getDocuments = function(db, res) {
  // Get the documents collection
  const collection = db.collection(collName);
  // Find some documents
  collection.find().sort({utc:-1}).toArray(function(err, docs) {
    assert.equal(err, null);
	res.status(200).json(docs);
  });
}

router.get('/',function (req,res) {
	var client = new mongo(url,{ useUnifiedTopology: true });
	client.connect(function(err) {
		assert.equal(null,err);
		var db =  client.db(dbname);
		getDocuments(db, res);
	});
	
});

const postDocuments = function(db, req, res) {
  // Get the documents collection
	//if failed, note it.
	var d=new Date();
	var currUTC = Date.now();
  const collection = db.collection(collName);
	var newComment = "failed to post comment#"+i;
	if(req.body.comment){
		newComment = req.body.comment
	}
	console.log("Cookie:"+JSON.stringify(req.cookies));
  // Insert a comment.
  collection.insertOne({
				comment:newComment,
				utc:currUTC,
				cookie:req.cookies.color
				}).then(() => {
	i++;
	res.sendStatus(200);
  });
}

router.post('/',function (req,res) {
	var client = new mongo(url,{ useUnifiedTopology: true });
	client.connect(function(err) {
		assert.equal(null,err);
		var db =  client.db(dbname);
		postDocuments(db, req, res);
	});
	
});

module.exports = router;
