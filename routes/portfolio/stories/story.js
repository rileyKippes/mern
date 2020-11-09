'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../../../ts_built/utils');

var ensureLoggedIn = require('connect-ensure-login');

var newStory = require('./newStory');

router.get('/', function (req, res) {
    res.send(utils.getBetterHTMLTemplate('portfolio/stories.html', { title: "Stories" }));
});

//I need the following
//search
//reading 
//insert new story
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

/* //for the individual pages
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

router.use('/newStory',
    ensureLoggedIn.ensureLoggedIn('/u/login'),
    newStory);

module.exports = router;