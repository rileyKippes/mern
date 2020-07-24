'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../utils');

var chat = require('./chat/chat');
var aboutSite = require('./aboutSite');

router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('/portfolio/portfolio.html',{title:"Portfolio"}));
});

router.use('/chat',chat);
router.use('/aboutSite',aboutSite);

module.exports = router;
