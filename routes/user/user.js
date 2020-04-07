var express = require('express');
var router = express.Router();
var utils = require('../utils');

var register = require('./register');
var login = require('./login');
var deleteU = require('./delete');

router.get('/',function (req,res) {
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	html += utils.getHTMLTemplate('user.html');
	//console.log(html);*/
	res.send(html);
});

router.all('/register',register);
router.all('/login',login);
router.all('/delete',deleteU);

module.exports = router;
