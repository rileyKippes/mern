var express = require('express');
var router = express.Router();
var utils = require('../utils');

// ~/u/delete
router.get('/delete',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('user/deleteUser.html', { title: "Delete User" }));
});

//when a user tries to delete themselves, they send a post request
router.post('/delete',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('user/delete_success.html', { title: "Delete User" }));
});

module.exports = router;
