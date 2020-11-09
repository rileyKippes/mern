'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../ts_built/utils');
var privacy = require('./privacy');

var db = require('../ts_built/mongo_manager');

router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('index.html',{title:"Website without much content"}));
});

router.use('/privacy', privacy);

router.get('/test',function (req,res) {
	db.find("comments",{}).then((ret) => { console.log(ret); res.status(200).json(ret); })
});

module.exports = router;
