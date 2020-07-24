var express = require('express');
var router = express.Router();
var utils = require('../utils');

var api = require('./profile_api');

// ~/u/register
router.get('/',function (req,res) {
	console.log(req.session);
	res.send(utils.getBetterHTMLTemplate('user/profile.html',{title:"Profile"}));
});

router.use('/api',api);

module.exports = router;
