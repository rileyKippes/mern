var express = require('express');
var router = express.Router();
var utils = require('../utils');

// ~/u/register
router.get('/register',function (req,res) {
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	html += utils.getHTMLTemplate('register.html');
	//console.log(html);*/
	res.send(html);
});

module.exports = router;
