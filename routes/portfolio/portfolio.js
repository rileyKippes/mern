'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../utils');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var chat = require('./chat/chat');

router.get('/',function (req,res) {
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	
	html += utils.getHTMLTemplate('portfolio.html');
	res.send(html);
});

router.use('/chat',chat);

module.exports = router;
