'use strict'

var express = require('express');
var router = express.Router();

var db = require('../../../ts_built/mongo_manager');

const collName = "comments";

router.get('/', function (req, res) {
	db.findSortandLimit(collName, {}, { utc: -1 }, 15).then((ret) => { res.json(ret); });
});

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
	db.insert(collName, {
		comment: newComment,
		utc: currUTC,
		cookie: req.user.color
	}).then((ret) => { res.status(200); });
});
module.exports = router;