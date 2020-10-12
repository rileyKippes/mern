var express = require('express');
var router = express.Router();
var utils = require('../utils');

var delete_api = require('./delete_api');

// ~/u/delete
router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('user/deleteUser.html', { title: "Delete User" }));
});

//when a user tries to delete themselves, they send a post request
router.post('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('user/delete_success.html', { title: "Delete User" }));
});

router.use('/api',delete_api);

module.exports = router;
