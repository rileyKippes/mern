'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../../../ts_built/utils');
var db = require('../../../ts_built/mongo_manager');

router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('portfolio/newStory.html',{title:"New Story"}));
});

router.post('/',function (req,res) {
	var oid = db.ObjectID();
	var newStoryID = oid(Date.now());
	var newPageID = oid(Date.now()+1);
	var newStory = {
		_id:newStoryID,
		title:req.body.title,
		firstPageID:newPageID,
		lastPageID:newPageID,
		authorID:req.user._id,
		author:req.user.username,
		description: req.body.description,
		tags: req.body.tags,
	};
	var newPage = {
		_id:newPageID,
		storyID:newStoryID,
		firstPageID:newPageID,
		prevPageID:null,
		nextPageID:null,
		lastPageID:newPageID,
		text: req.body.storyText,
		pageNum: 0,
	};
	db.insert('stories',newStory);
	db.insert('pages',newPage);

	res.json([newStory,newPage]);
});

module.exports = router;