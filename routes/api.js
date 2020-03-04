var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb://localhost:27017';
var dbname = 'mydb';

var client = new mongo(url,{ useUnifiedTopology: true });

function sendHTML(html,res) {
	res.send();
}

const findDocuments = function(db, callback, html, res) {
  // Get the documents collection
  const collection = db.collection('cars');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
	res.status(200).json(docs);
    //callback(html,res);
  });
}

router.get('/',function (req,res) {
	var html = '<html>';
	client.connect(function(err) {
		assert.equal(null,err);
		var db =  client.db(dbname);
		findDocuments(db, sendHTML, html, res);
	});
	//
});

module.exports = router;
