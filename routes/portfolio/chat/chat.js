'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../../../ts_built/utils');
var db = require('../../../ts_built/mongo_manager');

const collName = "comments";

router.get('/', function (req, res) {
	res.send(utils.getBetterHTMLTemplate('portfolio/chat.html', { title: "Chat box" }));
});

router.get('/api', function (req, res) {
	db.findSortandLimit(collName, {}, { utc: -1 }, 15).then((ret) => { res.json(ret); });
});

router.post('/api', function (req, res) {
	var currUTC = Date.now();
	var newComment = req.body.comment ?? "Failed to post comment";
	var color = '#000';
	if (req.user) {
		color = req.user.color;
	}
	// Insert a comment.
	db.insert(collName, {
		comment: newComment,
		utc: currUTC,
		cookie: color
	}).then((ret) => { res.status(200); });
});

module.exports = router;
