'use strict'

var express = require('express');
var router = express.Router();
var utils = require('./utils');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//login
router.get('/login',function (req,res) {
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	html += utils.getHTMLTemplate('login.html');
	//console.log(html);*/
	res.send(html);
});

router.post('/login',function (req,res) {
	passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
});

router.get('/',function (req,res) {
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	
	html += utils.getHTMLTemplate('index.html');
	res.send(html);
});

module.exports = router;
