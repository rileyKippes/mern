'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../../../ts_built/utils');
var db = require('../../../ts_built/mongo_manager');

var ensureLoggedIn = require('connect-ensure-login');

var newStory = require('./newStory');
var newPage = require('./newPage');
const { ObjectID } = require('../../../ts_built/mongo_manager');

const helpfulIDMessage = "\n\nIf below error is the 'Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters' error, then someone probably requested a bad id\n";

router.get('/', function (req, res) {
	res.send(utils.getBetterHTMLTemplate('portfolio/stories.html', { title: "Stories" }));
});

//I need the following
//search  				--done
//reading 				--mostly done
//insert new story 		--done
//insert new page
//update existing page
//update existing story
//deletion

/* for the stories meta data
	{
		_id:newStoryID,
		firstPageID:newPageID, //ID of the first page
		authorID:req.user._id,
		author:req.user.username,
		description: req.body.description,
		tags: req.body.tags, 
	}
*/

/* 
//for the individual pages
//pages are a doubly linked list
//also includes links to the first to last pages,
	{
		_id,
		storyId,
		firstPageID,
		prevPageID,
		nextPageID,
		lastPageID,
		text,
		pageNum,
	}
*/

router.use('/new/story',
	ensureLoggedIn.ensureLoggedIn('/u/login'),
	newStory);

router.use('/new/page',
	ensureLoggedIn.ensureLoggedIn('/u/login'),
	newPage);

router.get('/search', function (req, res) {
	console.log('search');
	db.find('stories').then((ret) => {
		res.json(ret);
	}).catch((err) => {
		console.log(helpfulIDMessage);
		console.log(err);
		res.status(500).json({ _id: null, title: "[object] Object" });
	});
});

router.get('/searchByID', function (req, res) {
	console.log('search by id');
	db.findByID('stories', req.query.id).then((ret) => {
		res.json(ret);
	}).catch((err) => {
		console.log(helpfulIDMessage);
		console.log(err);
		res.status(500).json({ _id: null, title: "server error" });
	});
});

router.get('/search/page', function (req, res) {
	console.log('search page');
	console.log(req.query.id);
	try{
		db.findByID('pages', req.query.id).then((ret) => {
			res.json(ret);
		}).catch((error) => {
			console.error('bad id');
		});
	}
	catch(error){
		console.log(helpfulIDMessage);
		console.log(error);
		res.status(500).json({ _id: null, title: "server error" });
	};;
});

router.get('/read', function (req, res) {
	res.send(utils.loadScript('/portfolio/stories/readStory.js', 'read_story_container', { title: "Read Story" }));
});

router.get('/read/page', function (req, res) {
	res.send(utils.loadScript('/portfolio/stories/readPage.js', 'read_page_container', { title: "Read Page" }));
});

router.get('/update/story', function (req, res) {
	res.send(utils.loadScript('/portfolio/stories/updateStory.js', 'update_story_container', { title: "Update Story" }));
});

router.get('/update/page', function (req, res) {
	res.send(utils.loadScript('/portfolio/stories/updatePage.js', 'update_page_container', { title: "Update Page" }));
});

router.post('/update/page', function (req, res) {
	// db.pages.update({_id:ObjectId("000e9808856628263f7e3cfd")},$set:{text:"Updated text"})
	var newText = { text: req.body.text };
	db.updateByID('pages', req.body.id, newText);
	res.status(200);
});

module.exports = router;