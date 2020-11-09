'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../../../ts_built/utils');

router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('portfolio/newStory.html',{title:"New Story"}));
});

router.post('/',function (req,res) {
	console.log("posting new story");
	console.log("body below");
	console.log(req.body);
	console.log("params below");
	console.log(req.params);
	console.log("user below");
	console.log(req.user);
	console.debug("posting new story");
	var newStoryID = mongo.ObjectID();
	var newPageID = mongo.ObjectID();
	console.log(newStoryID);
	console.log(newPageID);
	var newStory = {
		_id:newStoryID,
		firstPageID:newPageID,
		authorID:req.user._id,
		author:req.user.username,
		description: req.body.description,
		tags: req.body.tags,
	}
	var newPage = {
		_id:newPageID,
		storyId:newPageID,
		firstPageID:newPageID,
		prevPageID:null,
		nextPageID:null,
		lastPageID:newPageID,
		text: req.body.storyText,
		pageNum: 0,
	}
	db.insert(res,'stories',newStory);
	db.
	console.log(newStory);
	console.log(newPage);

	res.json({0:newStory,1:newPage});
});

module.exports = router;
