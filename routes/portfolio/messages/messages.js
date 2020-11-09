'use strict'
var express = require('express');
var router = express.Router();
var utils = require('../../../ts_built/utils');
var db = require('../../../ts_built/mongo_manager');

const collName = "messages";

router.get('/', function (req, res) {
	res.send(utils.getBetterHTMLTemplate('portfolio/messages.html', { title: "Direct Messages" }));
});

//get messages
router.get('/api', function (req, res) {
	db.findSortandLimit(collName, { $or: [{ sender: req.user.username }, { reciever: req.user.username }] }, { utc: -1 }, 0).then((ret) => { res.json(ret); });
});

//post messages
router.post('/api', function (req, res) {
	db.insert(collName, {
		newMessage: req.body.newMessage,
		utc: Date.now(),
		sender: req.user.username,
		reciever: req.body.reciever,
		color: req.user.color
	}).then(() => { res.sendStatus(200); });
});
module.exports = router;
