'use strict'
{
var express = require('express');
var router = express.Router();
var utils = require('../utils');

var register_api = require('./register_api');

// ~/u/register
router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('user/register.html',{title:"Register User"}));
});

//when a user tries to sign up, they send a post request
router.post('/',function (req,res) {
	//res.send(utils.getBetterHTMLTemplate('register_success.html',{title:"Registration successful"}));
});

router.use('/api',register_api);
}
module.exports = router;
