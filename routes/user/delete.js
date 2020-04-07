var express = require('express');
var router = express.Router();
var utils = require('../utils');

// ~/u/delete
router.get('/delete',function (req,res) {
	//console.log("Register Get");
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	html += utils.getHTMLTemplate('deleteUser.html');
	//console.log(html);*/
	res.status(200).send(html);
});

//when a user tries to delete themselves, they send a post request
router.post('/delete',function (req,res) {
	var html = '';
	html += '<html>';
	html += utils.getHTMLHead(req,res);
	html += utils.getHTMLTemplate('delete_success.html');
	res.send(html);
});

module.exports = router;
