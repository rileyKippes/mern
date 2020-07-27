var express = require('express');
var router = express.Router();
var utils = require('../utils');

// ~/u/register
router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('user/profile.html',{title:"Profile"}));
});

router.get('/api',function (req,res) {
	res.status(200).json(req.user);
});

module.exports = router;
