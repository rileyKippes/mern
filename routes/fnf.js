var express = require('express');
var router = express.Router();
var utils = require('./utils');

//404 Page
router.get('*',function (req,res) {
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	html += utils.getHTMLTemplate('fnf.html');
	res.status(404).send(html);
});

module.exports = router;
