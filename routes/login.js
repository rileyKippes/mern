var express = require('express');
var router = express.Router();
var utils = require('./utils');


//login 
/*
router.get('/login',function (req,res) {
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	html += utils.getHTMLTemplate('login.html');
	//console.log(html);
	res.send(html);
});

router.post('/login',function (req,res) {
	passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/',
                                   failureFlash: true })
});*/

module.exports = router;
