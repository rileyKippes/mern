var express = require('express');
var router = express.Router();
var utils = require('../../utils');
const collName = "messages";

var db = require('../../../ts_built/mongo_manager');

//get messages
router.get('/', function (req, res) {
	db.findSortandLimit(collName, { $or: [{ sender: req.user.username }, { reciever: req.user.username }] }, { utc: -1 }, 0).then((ret) => { res.json(ret); });
});

//post messages
router.post('/', function (req, res) {
	db.insert(collName,{
		newMessage: req.body.newMessage,
		utc: Date.now(),
		sender: req.user.username,
		reciever: req.body.reciever,
		color: req.user.color
	}).then(() => { res.sendStatus(200); });
});

module.exports = router;
