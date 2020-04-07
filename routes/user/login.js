var express = require('express');
var router = express.Router();
var utils = require('../utils');

// ~/u/register
router.get('/login',function (req,res) {
	//console.log("Register Get");
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	html += utils.getHTMLTemplate('login.html');
	//console.log(html);*/
	res.status(200).send(html);
});

//when a user tries to login, they send a post request
router.post('/login',function (req,res) {
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	html += utils.getHTMLTemplate('login_success.html');
	res.send(html);
});

module.exports = router;
