var express = require('express');
var router = express.Router();
var utils = require('../utils');

// ~/u/register
router.get('/register',function (req,res) {
	//console.log("Register Get");
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	html += utils.getHTMLTemplate('register.html');
	//console.log(html);*/
	res.status(200).send(html);
});

//when a user tries to sign up, they send a post request
router.post('/register',function (req,res) {
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	html += utils.getHTMLTemplate('register_success.html');
	res.send(html);
});

module.exports = router;
