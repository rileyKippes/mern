var express = require('express');
var router = express.Router();
var utils = require('utils');

var register = require('/users/register');

router.get('/',function (req,res) {
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	html += utils.getHTMLTemplate('user.html');
	//console.log(html);*/
	res.send(html);
});
