'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../../ts_built/utils');

router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('portfolio/aboutSite.html',{title:"About this site"}));
});

module.exports = router;
