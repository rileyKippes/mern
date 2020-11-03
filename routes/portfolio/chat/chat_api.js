'use strict'

var db = require('../../mongo_manager');
var express = require('express');
var router = express.Router();

const collName = "comments";

router.get('/', function (req, res) {
	var docs = {};
	db.findSortandLimit(res, collName, {}, { utc: -1 }, 15);
});

//uses the logged in user's color now
//it used to use a variable that was isolated to the chat script
//but now it's integrated!
router.post('/', function (req, res) {
	var d = new Date();
	var currUTC = Date.now();
	var newComment = "failed to post comment";
	if (req.body != undefined) {
		newComment = req.body.comment;
	}
	else {
		utils.debug("Cookie:" + JSON.stringify(req.cookies));
	}
	// Insert a comment.
	db.insert(res, collName, {
		comment: newComment,
		utc: currUTC,
		cookie: req.user.color
	});
});
module.exports = router;