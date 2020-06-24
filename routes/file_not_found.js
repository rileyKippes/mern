var express = require('express');
var router = express.Router();
var utils = require('./utils');

//404 Page
router.get('*',function (req,res) {
	res.status(404).send(utils.getBetterHTMLTemplate('fnf.html'));
});

module.exports = router;
