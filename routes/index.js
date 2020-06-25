'use strict'

var express = require('express');
var router = express.Router();
var utils = require('./utils');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('index.html',{title:"Riley Kippes' website"}));
});

module.exports = router;
