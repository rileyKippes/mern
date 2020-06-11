'use strict'

var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb://localhost:27017';
var dbname = 'mydb';

var client = new mongo(url,{ useUnifiedTopology: true });

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

const userLookup = function(db, callback, username, password) {
  // Get the documents collection
  const collection = db.collection('cars');
  // Find some documents
  collection.find({user}).toArray(function(err, docs) {
    assert.equal(err, null);
	console.log(docs);
	//res.status(200).json(docs);
    //callback(html,res);
  });
}

function attemptLogin = function(username, password) {
	//this handles all the authentication
	//params: username and password as strings
	//returns a boolean yes or no
	//todo: salt and hash
	var loginSuccess = false;
	client.connect(function(err) {
		assert.equal(null,err);
		var db =  client.db(dbname);
		userLookup(db, sendHTML, html, res);
	});
	return loginSuccess;
}

/*
router.get('/',function (req,res) {
	var html = '<html>';
	client.connect(function(err) {
		assert.equal(null,err);
		var db =  client.db(dbname);
		findDocuments(db, sendHTML, html, res);
	});
	
});

module.exports = router;*/
