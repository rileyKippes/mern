'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../../ts_built/utils');
var ensureLoggedIn = require('connect-ensure-login');

var chat = require('./chat/chat');
var aboutSite = require('./aboutSite');
var messages = require('./messages/messages');
var calculator = require('./calculator.js');
var stories = require('./stories/story');

router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('/portfolio/portfolio.html',{title:"Portfolio"}));
});

router.use('/chat',chat);
router.use('/aboutSite',aboutSite);
router.use('/messages',
	ensureLoggedIn.ensureLoggedIn('/u/login'),
	messages);
router.use('/calculator',calculator);
router.use('/story',stories);

module.exports = router;
