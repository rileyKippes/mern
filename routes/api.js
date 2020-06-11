var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb://localhost:27017';
var dbname = 'mydb';



const findDocuments = function(db, res) {
	var client = new mongo(url,{ useUnifiedTopology: true });
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
	var client = new mongo(url,{ useUnifiedTopology: true });
	client.connect(function(err) {
		assert.equal(null,err);
		var db =  client.db(dbname);
		findDocuments(db,res);
	});
});

module.exports = router;
