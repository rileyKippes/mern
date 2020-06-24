'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../utils');

var chat = require('./chat/chat');

router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('portfolio.html'));
});

router.use('/chat',chat);

module.exports = router;
