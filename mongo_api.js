//abstraction layer for interacting with MongoDB
var mClient = require('mongodb').MongoClient;
var mServer = require('mongodb').Server;
const assert = require('assert');

var url = 'localhost';
var port = 27017;
var dbname = 'mydb';

var client = new mClient(new mServer(url,port));

function testManyParam() {
	console.log("---");
	for(var i = 0; i < arguments.length; i++) {
		console.log(arguments[i]);
    }
}

const find = function(searchObject ,callback) {
  // Get the documents collection
	client.open(function(err,client) {
		assert.equal(null,err);
		var db =  client.db(dbname);
		const collection = db.collection('cars');
		// Find some documents
		collection.find(searchObject).toArray(function(err, docs) {
			console.log("find");
			callback(docs);
		});
		client.close();
	});
	
}

/*const findOne = function(searchObject ,callback) { 
	// Get the documents collection
	client.connect(function(err) {
		assert.equal(null,err);
		var db =  client.db(dbname);
		const collection = db.collection('cars');
		// Find some documents
		collection.find({}).toArray(function(err, docs) {
			callback;
		});
	});
}*/



find({}, testManyParam("Hello World"));
find({}, testManyParam("Hello", "World"));
find({}, testManyParam("Hello", "World","Fizz","Buzz"));

