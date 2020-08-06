var express = require('express');
var router = express.Router();
var utils = require('../utils');

// ~/u/profile
router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('user/profile.html',{title:"Profile"}));
});

module.exports = router;
