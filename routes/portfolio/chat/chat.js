'use strict'
{
var express = require('express');
var router = express.Router();
var utils = require('../../utils');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var chat_api = require('./chat_api');

router.get('/',function (req,res) {
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	
	html += utils.getHTMLTemplate('chat.html');
	res.send(html);
});

router.use('/api',chat_api);
}
module.exports = router;
