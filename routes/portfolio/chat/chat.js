'use strict'
{
var express = require('express');
var router = express.Router();
var utils = require('../../utils');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var chat_api = require('./chat_api');

router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('chat.html'));
});

router.use('/api',chat_api);
}

module.exports = router;
